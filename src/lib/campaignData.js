import { supabase } from "./supabaseClient.js";

// Papéis que enxergam e editam tudo na campanha (equivalente ao antigo "equipe")
const MANAGER_ORG_ROLES = ["org_admin", "presidente", "coordenador", "coordenador_marketing"];
const MANAGER_CAMPAIGN_ROLES = ["gestor_campanha", "equipe"];

function dbItemToUi(row) {
  return {
    id: row.id,
    date: row.item_date,
    type: row.type,
    channels: row.channels || [],
    title: row.title,
    desc: row.description || "",
    status: row.status,
    caption: row.caption || "",
    imageText: row.image_text || "",
    feedImage: row.feed_image_url,
    storyImage: row.story_image_url,
    approval: row.approval_status,
    approvalNote: row.approval_note || "",
    approvedBy: row.approved_by,
    timing: row.timing || [],
    direction: row.direction,
  };
}

function findPhaseId(phases, dateIso) {
  const phase = phases.find((p) => dateIso >= p.start_date && dateIso <= p.end_date);
  return phase ? phase.id : null;
}

export async function loadMyContext() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: campaigns, error: campErr } = await supabase
    .from("campaigns")
    .select("id, organization_id, name, candidate_name, office, party, party_number, state, city, site_url, candidate_photo_url")
    .limit(1);
  if (campErr) throw campErr;
  const campaign = campaigns?.[0] || null;
  if (!campaign) return { user, campaign: null, isClient: true };

  const [{ data: orgMember }, { data: campMember }] = await Promise.all([
    supabase.from("organization_members").select("role").eq("organization_id", campaign.organization_id).eq("user_id", user.id).maybeSingle(),
    supabase.from("campaign_members").select("role").eq("campaign_id", campaign.id).eq("user_id", user.id).maybeSingle(),
  ]);

  const isManager =
    (orgMember && MANAGER_ORG_ROLES.includes(orgMember.role)) ||
    (campMember && MANAGER_CAMPAIGN_ROLES.includes(campMember.role));

  return { user, campaign, isClient: !isManager, orgRole: orgMember?.role || null, campaignRole: campMember?.role || null };
}

export async function loadCampaignBundle(campaignId) {
  const [{ data: phases }, { data: deliverables }, { data: items }, { data: photos }, { data: accounts }] = await Promise.all([
    supabase.from("campaign_phases").select("*").eq("campaign_id", campaignId).order("sort_order"),
    supabase.from("deliverables").select("*").eq("campaign_id", campaignId).order("sort_order"),
    supabase.from("content_items").select("*").eq("campaign_id", campaignId).order("item_date"),
    supabase.from("gallery_photos").select("*").eq("campaign_id", campaignId).order("created_at"),
    supabase.from("social_accounts").select("*").eq("campaign_id", campaignId),
  ]);

  const galleries = {
    fotosIA: { estudio: [], rua: [], evento: [], saidaReuniao: [] },
    fotosPro: [],
  };
  for (const p of photos || []) {
    if (p.group_key === "fotos_ia" && galleries.fotosIA[p.category]) {
      galleries.fotosIA[p.category].push({ id: p.id, url: p.url });
    } else if (p.group_key === "fotos_pro") {
      galleries.fotosPro.push({ id: p.id, url: p.url });
    }
  }

  const accesses = { ig: { user: "", pass: "" }, fb: { user: "", pass: "" } };
  for (const a of accounts || []) {
    if (a.platform === "instagram") accesses.ig = { user: a.username || "", pass: a.password || "" };
    if (a.platform === "facebook") accesses.fb = { user: a.username || "", pass: a.password || "" };
  }

  return {
    phases: phases || [],
    deliverables: deliverables || [],
    items: (items || []).map(dbItemToUi),
    galleries,
    accesses,
  };
}

export async function logActivity(campaignId, organizationId, action, entity, entityId, metadata = {}) {
  const { data: { user } } = await supabase.auth.getUser();
  await supabase.from("activity_log").insert({
    organization_id: organizationId,
    campaign_id: campaignId,
    user_id: user?.id,
    action,
    entity,
    entity_id: entityId,
    metadata,
  }).then(null, () => {}); // auditoria não deve derrubar a ação principal se falhar
}

export async function createContentItem(campaignId, phases, data) {
  const payload = {
    campaign_id: campaignId,
    phase_id: findPhaseId(phases, data.date),
    item_date: data.date,
    type: data.type,
    title: data.title,
    description: data.desc || null,
    caption: data.caption || null,
    image_text: data.imageText || null,
    feed_image_url: data.feedImage,
    story_image_url: data.storyImage,
    channels: data.channels || [],
    status: data.status,
    timing: data.timing || [],
    direction: data.direction || null,
  };
  const { data: row, error } = await supabase.from("content_items").insert(payload).select().single();
  if (error) throw error;
  return dbItemToUi(row);
}

export async function updateContentItem(campaignId, phases, id, data) {
  const payload = {
    phase_id: findPhaseId(phases, data.date),
    item_date: data.date,
    type: data.type,
    title: data.title,
    description: data.desc || null,
    caption: data.caption || null,
    image_text: data.imageText || null,
    feed_image_url: data.feedImage,
    story_image_url: data.storyImage,
    channels: data.channels || [],
    status: data.status,
  };
  const { error } = await supabase.from("content_items").update(payload).eq("id", id);
  if (error) throw error;
}

export async function deleteContentItem(id) {
  const { error } = await supabase.from("content_items").delete().eq("id", id);
  if (error) throw error;
}

export async function recordApproval(campaignId, contentItemId, decision, note) {
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase.from("content_approvals").insert({
    content_item_id: contentItemId,
    campaign_id: campaignId,
    decision,
    note: note || null,
    decided_by: user.id,
  });
  if (error) throw error;
}

export async function addGalleryPhotos(campaignId, group, category, urls) {
  const rows = urls.map((url) => ({
    campaign_id: campaignId,
    group_key: group === "fotosia" ? "fotos_ia" : "fotos_pro",
    category: group === "fotosia" ? category : null,
    url,
  }));
  const { data, error } = await supabase.from("gallery_photos").insert(rows).select();
  if (error) throw error;
  return data;
}

export async function removeGalleryPhoto(photoId) {
  const { error } = await supabase.from("gallery_photos").delete().eq("id", photoId);
  if (error) throw error;
}

export async function saveSiteUrl(campaignId, siteUrl) {
  const { error } = await supabase.from("campaigns").update({ site_url: siteUrl }).eq("id", campaignId);
  if (error) throw error;
}

export async function saveCandidatePhoto(campaignId, photoUrl) {
  const { error } = await supabase.from("campaigns").update({ candidate_photo_url: photoUrl }).eq("id", campaignId);
  if (error) throw error;
}

export async function saveSocialAccounts(campaignId, accesses) {
  const { data: { user } } = await supabase.auth.getUser();
  const rows = [
    { campaign_id: campaignId, platform: "instagram", username: accesses.ig.user, password: accesses.ig.pass, updated_by: user.id },
    { campaign_id: campaignId, platform: "facebook", username: accesses.fb.user, password: accesses.fb.pass, updated_by: user.id },
  ];
  const { error } = await supabase.from("social_accounts").upsert(rows, { onConflict: "campaign_id,platform" });
  if (error) throw error;
}

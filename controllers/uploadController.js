import supabase from "../services/supabase.js";

export const  uploadFileWithContact = async (req, res) => {
  try {
    const file = req.file;
    const { nom, prenom, email } = req.body;

    if (!file) {
      return res.status(400).json({ error: "Aucun fichier reçu" });
    }

    if (!nom || !prenom || !email) {
      return res.status(400).json({ error: "Informations contact manquantes" });
    }

    // 1. Upload dans Storage
    const filePath = `${Date.now()}_${file.originalname}`;

    const { error: uploadError } = await supabase.storage
      .from("uploads")
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
      });

    if (uploadError) {
      return res.status(400).json({ error: "Erreur upload", details: uploadError });
    }

    // 2. URL publique
    const { data: publicUrl } = supabase.storage
      .from("uploads")
      .getPublicUrl(filePath);

    // 3. Enregistrement du contact en BDD
    const { data, error: insertError } = await supabase
      .from("contacts")
      .insert({
        nom,
        prenom,
        email,
        filename: filePath,
        file_url: publicUrl.publicUrl
      })
      .select();

    if (insertError) {
      return res.status(400).json({ error: "Erreur enregistrement contact", details: insertError });
    }

    return res.json({
      message: "Upload + contact enregistré",
      file: publicUrl.publicUrl,
      contact: data[0]
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};
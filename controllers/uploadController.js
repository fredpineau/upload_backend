import supabase from "../services/supabase.js";
import crypto from "crypto";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Aucun fichier fourni" });

    const fileExt = req.file.originalname.split(".").pop();
    const fileName = crypto.randomUUID() + "." + fileExt;

    const { error } = await supabase.storage
      .from("uploads")
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (error) return res.status(500).json({ error: "Erreur upload", details: error });

    const { data } = supabase.storage.from("uploads").getPublicUrl(fileName);

    res.json({ message: "Upload réussi", fileUrl: data.publicUrl, fileName });
  } catch (e) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
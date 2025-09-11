import { Certificate, User } from "../models/index.js";

//Add Certificate
export const addCertificate = async (req, res, next) => {
    try {

        if (!req.file) {
            return res.status(400).json({ error: "file is required" });
        }

        if (req.file.mimetype !== "application/pdf") {
            return res.status(400).json({ error: "Only PDF files are allowed" });
        }

        const certificate = await Certificate.create({
            file_name: req.file.originalname,
            pdf: req.file.buffer,
            created_by: req.user.id
        });

        const certificateWithRelation = await Certificate.findByPk(certificate.id, {
            include: [{ model: User, as: "creator", attributes: ["id", "name"] }]
        });

        return res.status(201).json({ message: "Certificate Added", certificateWithRelation });
    } catch (error) {
        next(error);
    }
};

//Get all certificates
export const getAllCertificates = async (req, res, next) => {
    try {
        const certificates = await Certificate.findAll({
            include: [{ model: User, as: "creator", attributes: ["id", "name"] }],
            attributes: ["id", "file_name", "created_by", "createdAt"],
        });
        return res.json(certificates)
    } catch (error) {
        next(error)
    }
}

//Get Certificate by ID
export const getCertificateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const certificate = await Certificate.findByPk(id, {
            include: [
                { model: User, as: "creator", attributes: ["id", "name"] }
            ]
        });

        if (!certificate) {
            return res.status(404).json({ error: "Certificate not found" })
        }

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `inline; filename="${certificate.file_name}"`);
        res.send(certificate.pdf);
    } catch (error) {
        next(error)
    }
}

// Update certificate
export const updateCertificate = async (req, res, next) => {
    try {
        const { id } = req.params;

        const certificate = await Certificate.findByPk(id);
        if (!certificate) {
            return res.status(404).json({ message: "Certificate not found" });
        }

        if (req.file) {
            if (req.file.mimetype !== "application/pdf") {
                return res.status(400).json({ error: "Only PDF files are allowed" });
            }

            certificate.file_name = req.file.originalname;
            certificate.pdf = req.file.buffer;
        }

        await certificate.save();

        const updatedCertificate = await Certificate.findByPk(certificate.id, {
            include: [{ model: User, as: "creator", attributes: ["id", "name"] }],
        });

        return res.status(200).json({ message: "Certificate Updated", updatedCertificate });
    } catch (error) {
        next(error);
    }
};

// Delete Certificate
export const deleteCertificate = async (req, res, next) => {
    try {
        const { id } = req.params;
        const certificate = await Certificate.findByPk(id);

        if (!certificate) return res.status(404).json({ message: "Certificate not found" });

        await certificate.destroy();
        res.json({ message: "Certificate deleted successfully" });
    } catch (error) {
        next(error)
    }
}; 


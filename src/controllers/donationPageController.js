import { User, DonationPage } from '../models/index.js';

//Create Donation page 
export async function createDonationPage(req, res, next) {
    try {
        const existingPage = await DonationPage.findOne();
        if (existingPage) {
            return res.status(400).json({ error: "A donation page already exists. Please update it instead." });
        }

        if (!req.file) {
            return res.status(400).json({ error: "File is required" });
        } 

        const donationPage = await DonationPage.create({
            title: req.body.title,
            description: req.body.description,
            file_name: req.file.originalname,
            data: req.file.buffer,
            sub_title: req.body.sub_title,
            account_holder_name: req.body.account_holder_name,
            account_number: req.body.account_number,
            bank_name: req.body.bank_name,
            ifsc_code: req.body.ifsc_code,
            created_by: req.user?.id
        });

        const donationPageWithRelation = await DonationPage.findByPk(donationPage.id, {
            include: [
                { model: User, as: "creator", attributes: ["id", "name"] }
            ]
        })

        res.status(201).json({
            success: true,
            message: "Donation Page created successfully",
            donationPageWithRelation: {
                id: donationPageWithRelation.id,
                title: donationPageWithRelation.title,
                description: donationPageWithRelation.description,
                file_name: donationPageWithRelation.file_name,
                sub_title: donationPageWithRelation.sub_title,
                account_holder_name: donationPageWithRelation.account_holder_name,
                account_number: donationPageWithRelation.account_number,
                bank_name: donationPageWithRelation.bank_name,
                ifsc_code: donationPageWithRelation.ifsc_code,
                created_by: donationPageWithRelation.created_by,
                creator: donationPageWithRelation.creator,
                createdAt: donationPageWithRelation.createdAt,
                updatedAt: donationPageWithRelation.updatedAt,
                data: donationPageWithRelation.data ? donationPageWithRelation.data.toString("base64") : null,
            }
        });
    } catch (error) {
        next(error);
    }
}

// Get Single Donation Page
export async function getDonationPage(req, res, next) {
    try {
        const { id } = req.params;
        const donationPage = await DonationPage.findByPk(id, {
            include: [
                { model: User, as: "creator", attributes: ["id", "name"] }
            ]
        });

        if (!donationPage) return res.status(404).json({ error: "Donation Page not found" });

        res.json({
            id: donationPage.id,
            title: donationPage.title,
            description: donationPage.description,
            sub_title: donationPage.sub_title,
            account_holder_name: donationPage.account_holder_name,
            account_number: donationPage.account_number,
            bank_name: donationPage.bank_name,
            ifsc_code: donationPage.ifsc_code,
            created_by: donationPage.created_by,
            creator: donationPage.creator,
            createdAt: donationPage.createdAt,
            updatedAt: donationPage.updatedAt,
            file_name: donationPage.file_name,
            data: donationPage.data ? donationPage.data.toString("base64") : null,
        });
    } catch (error) {
        next(error);
    }
}

// Get All Donation Pages
export async function getAllDonationPages(req, res, next) {
    try {
        const donationPages = await DonationPage.findAll({
            include: [{ model: User, as: "creator", attributes: ["id", "name"] }
            ]
        });
        res.json(donationPages.map(page => ({
            id: page.id,
            title: page.title,
            description: page.description,
            sub_title: page.sub_title,
            account_holder_name: page.account_holder_name,
            account_number: page.account_number,
            bank_name: page.bank_name,
            ifsc_code: page.ifsc_code,
            created_by: page.created_by,
            creator: page.creator,
            createdAt: page.createdAt,
            updatedAt: page.updatedAt,
            file_name: page.file_name,
            data: page.data ? page.data.toString("base64") : null,
        })));
    } catch (error) {
        next(error);
    }
}

// Update Donation Page
export async function updateDonationPage(req, res, next) {
    try {
        const { id } = req.params;
        const { title, description, sub_title, account_holder_name, account_number, bank_name, ifsc_code } = req.body;
        const donationPage = await DonationPage.findByPk(id);
        if (!donationPage) return res.status(404).json({ error: "Donation Page not found" });

        if (req.file) {
            donationPage.file_name = req.file.originalname;
            donationPage.data = req.file.buffer;
        }

        if (title) donationPage.title = title;
        if (description) donationPage.description = description;
        if (sub_title) donationPage.sub_title = sub_title;
        if (account_holder_name) donationPage.account_holder_name = account_holder_name;
        if (account_number) donationPage.account_number = account_number;
        if (bank_name) donationPage.bank_name = bank_name;
        if (ifsc_code) donationPage.ifsc_code = ifsc_code;

        await donationPage.save();

        const updated = await DonationPage.findByPk(donationPage.id, {
            include: [
                { model: User, as: "creator", attributes: ["id", "name"] }
            ]
        });

        res.json({
            id: updated.id,
            title: updated.title,
            description: updated.description,
            sub_title: updated.sub_title,
            account_holder_name: updated.account_holder_name,
            account_number: updated.account_number,
            bank_name: updated.bank_name,
            ifsc_code: updated.ifsc_code,
            created_by: updated.created_by,
            creator: updated.creator,
            createdAt: updated.createdAt,
            updatedAt: updated.updatedAt,
            file_name: updated.file_name,
            data: updated.data ? updated.data.toString("base64") : null,
        });
    } catch (error) {
        next(error);
    }
}

// Delete Donation Page
export async function deleteDonationPage(req, res) {
    try {
        const { id } = req.params;
        const donationPage = await DonationPage.findByPk(id);
        if (!donationPage) return res.status(404).json({ error: "Donation Page not found" });

        await donationPage.destroy();
        res.json({ message: "Donation Page deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
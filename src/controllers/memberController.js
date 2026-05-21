import { Member, User } from "../models/index.js";
import { MEMBER_CATEGORIES } from "../models/Member.model.js";
import { Op } from "sequelize";

const includeCreator = [
    { model: User, as: "creator", attributes: ["id", "name"] }
];

const formatMember = (member) => ({
    id: member.id,
    category: member.category,
    name: member.name,
    designation: member.designation,
    created_by: member.created_by,
    creator: member.creator,
    createdAt: member.createdAt,
    updatedAt: member.updatedAt,
});

const allowedSortFields = ["id", "category", "name", "designation", "createdAt", "updatedAt"];

// Create Member
export const createMember = async (req, res, next) => {
    try {
        const { category, name, designation } = req.body;

        const existingMember = await Member.findOne({ where: { name } });
        if (existingMember) {
            return res.status(409).json({
                success: false,
                message: "Member with this name already exists"
            });
        }

        const member = await Member.create({
            category,
            name,
            designation: category === MEMBER_CATEGORIES.NATIONAL_CORE_COMMITTEE ? designation : null,
            created_by: req.user.id,
        });

        const memberWithCreator = await Member.findByPk(member.id, {
            include: includeCreator
        });

        res.status(201).json({
            success: true,
            message: "Member created successfully",
            memberWithCreator: formatMember(memberWithCreator)
        });
    } catch (error) {
        next(error);
    }
};

// Get All Members
export const getAllMembers = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 10,
            category,
            search = "",
            sortBy = "createdAt",
            order = "DESC",
        } = req.query;

        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;
        const offset = (pageNumber - 1) * limitNumber;

        const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";
        const sortOrder = ["ASC", "DESC"].includes(order.toUpperCase()) ? order.toUpperCase() : "DESC";

        const whereCondition = {};

        if (category) {
            whereCondition.category = category;
        }

        if (search) {
            whereCondition[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { category: { [Op.like]: `%${search}%` } },
            ];
        }

        const { count, rows } = await Member.findAndCountAll({
            where: whereCondition,
            include: includeCreator,
            offset,
            limit: limitNumber,
            order: [[sortField, sortOrder]],
        });

        res.json({
            pagination: {
                total: count,
                page: pageNumber,
                limit: limitNumber,
                totalPages: Math.ceil(count / limitNumber),
            },
            data: rows.map(member => formatMember(member))
        });
    } catch (error) {
        next(error);
    }
};

// Get Member by ID
export const getMemberById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const member = await Member.findByPk(id, {
            include: includeCreator
        });

        if (!member) return res.status(404).json({ success: false, message: "Member not found" });

        res.json(formatMember(member));
    } catch (error) {
        next(error);
    }
};

// Update Member
export const updateMember = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { category, name, designation } = req.body;
        const parsedId = parseInt(id, 10);

        if (isNaN(parsedId)) {
            return res.status(400).json({ success: false, message: "Invalid member ID" });
        }

        const member = await Member.findByPk(parsedId);
        if (!member) return res.status(404).json({ success: false, message: "Member not found" });

        if (name) {
            const existingMember = await Member.findOne({
                where: {
                    name,
                    id: { [Op.ne]: parsedId }
                }
            });

            if (existingMember) {
                return res.status(409).json({
                    success: false,
                    message: "Member with this name already exists"
                });
            }
        }

        const nextCategory = category || member.category;
        const nextDesignation = designation !== undefined ? designation : member.designation;

        if (nextCategory === MEMBER_CATEGORIES.NATIONAL_CORE_COMMITTEE && !nextDesignation) {
            return res.status(400).json({
                success: false,
                message: "Designation is required for national core commitee members"
            });
        }

        if (category) member.category = category;
        if (name) member.name = name;

        if (nextCategory === MEMBER_CATEGORIES.NATIONAL_CORE_COMMITTEE) {
            member.designation = nextDesignation;
        } else {
            member.designation = null;
        }

        await member.save();

        const updated = await Member.findByPk(member.id, {
            include: includeCreator
        });

        res.json({
            success: true,
            message: "Member updated successfully",
            updatedMember: formatMember(updated)
        });
    } catch (error) {
        next(error);
    }
};

// Delete Member
export const deleteMember = async (req, res, next) => {
    try {
        const { id } = req.params;
        const member = await Member.findByPk(id);

        if (!member) return res.status(404).json({ success: false, message: "Member not found" });

        await member.destroy();
        res.json({ success: true, message: "Member deleted successfully" });
    } catch (error) {
        next(error);
    }
};

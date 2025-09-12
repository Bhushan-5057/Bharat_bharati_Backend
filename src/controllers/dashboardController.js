import { Op } from "sequelize";
import { Integration, Activities, Service, Certificate, OfficeBearer, User } from "../models/index.js";

// Get all dashboard data
export const getDashboardData = async (req, res, next) => {
    try {
        const userRole = req.user.role;
        const DashBoardData = {};

        // Admin user data
        if (userRole === "admin") {
            const userInfo = await User.findAndCountAll({
                where: { status: { [Op.ne]: "Deleted" } }
            }).catch(() => ({ count: 0, rows: [] }));

            DashBoardData.users = {
                count: userInfo?.count || 0,
                users: userInfo?.rows || []
            };
        }

        const [integrations, activities, services, certificates, officeBearers] = await Promise.all([
            Integration.findAndCountAll().catch(() => ({ count: 0, rows: [] })),
            Activities.findAndCountAll().catch(() => ({ count: 0, rows: [] })),
            Service.findAndCountAll().catch(() => ({ count: 0, rows: [] })),
            Certificate.findAndCountAll().catch(() => ({ count: 0, rows: [] })),
            OfficeBearer.findAndCountAll().catch(() => ({ count: 0, rows: [] })),
        ]);

        DashBoardData.integrations = { count: integrations.count, items: integrations.rows };
        DashBoardData.activities = { count: activities.count, items: activities.rows };
        DashBoardData.services = { count: services.count, items: services.rows };
        DashBoardData.certificates = { count: certificates.count, items: certificates.rows };
        DashBoardData.officeBearers = { count: officeBearers.count, items: officeBearers.rows };

        return res.status(200).json({
            success: true,
            dashboard: DashBoardData
        });
    } catch (error) {
        next(error);
    }
};
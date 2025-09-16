import Banner from "./HomePage/Banner.model.js";
import User from "./User.model.js"
import OfficeBearer from "./HomePage/Officebearer.model.js";
import Service from "./HomePage/Service.model.js";
import Certificate from "./Certificate.model.js";
import Integration from "./Integration.model.js";
import Education from "./Education/Education.model.js";
import EducationImages from "./Education/EducationImages.model.js";
import Activities from "./Activities.model.js";
import Cities from "./Cities/Cities.model.js";
import CityImages from "./Cities/CityImages.model.js";
import GalleryVideo from "./GalleryVideo.model.js";
import GalleryImage from "./GalleryImage.model.js";
import DonationPage from "./DonationPage.model.js";
import Blog from "./Blogs.model.js";

Banner.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(Banner, { foreignKey: "created_by", as: "banners" });

OfficeBearer.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(OfficeBearer, { foreignKey: "created_by", as: "office_bearers" });

Service.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(Service, { foreignKey: "created_by", as: "service" });

Certificate.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(Certificate, { foreignKey: "created_by", as: "certificates" });

Integration.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(Integration, { foreignKey: "created_by", as: "integtration" });

Activities.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(Activities, { foreignKey: "created_by", as: "activities" });

Education.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(Education, { foreignKey: "created_by", as: "education" });

Cities.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(Cities, { foreignKey: "created_by", as: "cities" });

EducationImages.belongsTo(Education, { foreignKey: "education_id" });
Education.hasMany(EducationImages, { foreignKey: "education_id", as: "images" });

CityImages.belongsTo(Cities, { foreignKey: "cities_id" });
Cities.hasMany(CityImages, { foreignKey: "cities_id", as: "images" });

User.hasMany(GalleryImage, { foreignKey: "created_by", as: "images" });
GalleryImage.belongsTo(User, { foreignKey: "created_by", as: "creator" });


User.hasMany(GalleryVideo, { foreignKey: "created_by", as: "videos" });
GalleryVideo.belongsTo(User, { foreignKey: "created_by", as: "creator" });

DonationPage.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(DonationPage, { foreignKey: "created_by", as: "donation_page" }); 

Blog.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(Blog, { foreignKey: "created_by", as: "blogs" });

export {
    Banner,
    User,
    OfficeBearer,
    Service,
    Certificate,
    Integration,
    Education,
    EducationImages,
    Activities,
    Cities,
    CityImages,
    GalleryImage,
    GalleryVideo,
    DonationPage,
    Blog
};
const express = require("express");
const router = express.Router();

const UserRoutes = require("./userRoutes");
const PostRoutes = require("./postRoutes");
const CollegeRoutes = require("./collegeRoutes");

// export default class Routes {
//     constructor(router) {
//         router.use("/api/users",UserRoutes)
//         app.use("/api/movies/",MovieRoutes)
//     }
// }

export default class Routes {
    constructor(router) {
        router.use("/user",UserRoutes)
        router.use("/post",PostRoutes)
        router.use("/college",CollegeRoutes)

    }
}
module.exports = router;

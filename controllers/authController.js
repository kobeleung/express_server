const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// exports.getAllPosts = async (req, res, next) => {
//     try {

//         const posts = await Post.find(req.params);

//         res.status(200).json({
//             status: "success",
//             results: posts.length,
//             data: {
//                 posts: posts,
//             }
//         })
//     } catch (e) {
//         console.error(e);
//         res.status(500).json({
//             status: "fail",
//         })
//     }
// };

// exports.getOnePost = async (req, res, next) => {
//     try {

//         const post = await Post.findById(req.params.id);

//         res.status(200).json({
//             status: "success",
//             data: {
//                 post,
//             }
//         })
//     } catch (e) {
//         console.error(e);
//         res.status(500).json({
//             status: "fail",
//         })
//     }
// };

exports.signUp = async (req, res, next) => {
    try {
        let {username, password} = req.body;
        let hashPassword = await bcrypt.hashSync(password, 8)
        const newUser = await User.create({
            username,
            "password": hashPassword,
        });

        res.status(201).json({
            status: "success",
            data: {
                newUser,
            }
        })
    } catch (e) {
        console.error(e);
        res.status(500).json({
            status: "fail",
        })
    }
};

exports.logIn = async (req, res, next) => {
    try {

        let {username, password} = req.body;
        let user = await User.findOne({username});

        if (!user) {
            res.status(404).json({
                "status": "fail",
                "message": "User not found or incorrect password",
            });
        }
        let match = await bcrypt.compare(password, user.password);
        if (match) {
            res.status(200).json({
                "status": "success",
            });
            return;
        } else {
            
            res.status(400).json({
                "status": "fail",
                "message": "User not found or incorrect password"
            });
        }

    } catch (e) {

    }
    // let user = User.findOne({"username": req.body.username + '23412341'});
    // if (!user || bcrypt.compare(req.body.password, user.schema.password)) {
    //     res.status(401);
    // }
    // // console.log(user);
    // res.status(200);

}

// exports.updatePost = async (req, res, next) => {
//     try {

//         const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true,
//         });

//         res.status(200).json({
//             status: "success",
//             data: {
//                 post,
//             }
//         })
//     } catch (e) {
//         console.error(e);
//         res.status(500).json({
//             status: "fail",
//         })
//     }
// };

// exports.deletePost = async (req, res, next) => {
//     try {

//         const post = await Post.findByIdAndDelete(req.params.id);

//         res.status(200).json({
//             status: "success",
//         })
//     } catch (e) {
//         console.error(e);
//         res.status(500).json({
//             status: "fail",
//         })
//     }
// };

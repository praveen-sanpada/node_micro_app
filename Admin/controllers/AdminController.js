class AdminController {

    async getAdminDetails(req, res) {
        try {
            const postData = req.body;
            io.emit('admin', postData);
            console.log(postData);
            return res.status(200).json({
                status: "success",
                code: 200,
                message: "Success due to correct Information.",
                data: postData
            });
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                code: 500,
                message: "Failed due to server error.",
                error: error.message
            });
        }
    }

}

module.exports = new AdminController();

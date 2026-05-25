import jwt from 'jsonwebtoken'
const generateTokenAndUser = (user, req, res, message) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })

    user.password = undefined

    const { _id, first_name, last_name, email, role } = user

    return res.json({
        user: { _id, first_name, last_name, email, role },
        token,
        refreshToken,
        message
    })
}

export default generateTokenAndUser
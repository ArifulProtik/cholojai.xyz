import jwt from 'jsonwebtoken'
export const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.acces_token
    if (!token) {
      return res.status(401).json({
        "errors": {
          "msg": "Token Not Found"
        }
      })
    }
    const decoded = jwt.verify(token, process.env.JWT)
    const { id, role } = decoded
    const userdata = { id, role }
    res.locals.user = userdata
    next()
  } catch (error) {
    return res.status(401).jso({
      "errors": {
        "msg": "Not Authorized"
      }
    })

  }
}

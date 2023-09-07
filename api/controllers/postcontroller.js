import { body, validationResult } from "express-validator";
import prisma from "../prisma/index.js";
import GenSlug from "../utility/sluggen.js";




export const PostValidation = [
  body("title").trim().notEmpty().withMessage("Title field Required"),
  body("content").notEmpty().withMessage("Content is required"),
  body("feature_image").notEmpty().isURL().withMessage("Musst Be A Valid URL"),
]

export const CreatePost = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ "errors": errors.array() })
  }
  const { title, content, feature_image, tags } = req.body
  const slug = GenSlug(title)
  try {
    const post = await prisma.blog.create({
      data: {
        title,
        content,
        feature_image,
        tags,
        slug,
        author: { connect: { id: res.locals.user.id } }
      }
    })
    return res.status(201).json(post)
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      "errors": {
        "msg": "Internal Server Error"
      }
    })
  }
}
export const GetAllPosst = async (req, res) => {
  const page = parseInt(req.params.page);
  if (page < 0) {
    return res.status(422).json({
      "errors": {
        "msg": "Invalid Page Number"
      }
    })
  }
  try {
    const totalcount = await prisma.blog.count();
    const limit = 6;
    const total_pages = Math.ceil(totalcount / limit);
    if (page > total_pages) {
      return res.status(404).json({
      })

    }
    const offset = page * limit - limit;


    const posts = await prisma.blog.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: "desc"

      },
      select: {
        title: true,
        id: true,
        slug: true,
        feature_image: true,
        createdAt: true,
        tags: true,
        author: {

          select: {
            id: true,
            name: true,
            username: true,
            profile_photo: true
          }

        },
        _count: {
          select: {
            Like: true,
            Comment: true
          }
        }
      }
    })
    return res.status(200).json({ posts, total_pages, current_page: page })
  } catch (error) {
    return res.status(401).json({
      "errors": {
        "msg": "Internal Server Error"
      }
    })
  }
}
export const UpdatePost = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ "errors": errors.array() })
  }
  const { title, content, feature_image, tags } = req.body
  const slug = GenSlug(title)
  try {
    const data = await prisma.blog.findUnique({
      where: {
        id: req.params.id
      },
      include: {
        author: true
      }
    })
    console.log(data)
    if (data.author.id !== res.locals.user.id) {
      return res.status(401).json({
        "errors": {
          "msg": "Not Authorized"
        }
      })
    }
    const post = await prisma.blog.update({
      where: {
        id: req.params.id
      },
      data: {
        title,
        content,
        feature_image,
        tags,
        slug,
      }
    })
    return res.status(201).json(post)
  } catch (error) {
    return res.status(401).json({
      "errors": {
        "msg": "Not Found"
      }
    })
  }
}

export const DeletePost = async (req, res) => {
  try {
    const data = await prisma.blog.findUnique({
      where: {
        id: req.params.id
      },
      include: {
        author: true
      }
    })
    if (data.author.id !== res.locals.user.id) {
      return res.status(401).json({
        "errors": {
          "msg": "Not Authorized"
        }
      })
    }
    await prisma.blog.delete({
      where: {
        id: req.params.id
      }
    })
    return res.status(200).json({
      "msg": "Post Deleted"
    })

  } catch (error) {
    return res.status(401).json({
      "errors": {
        "msg": "Not Found"
      }
    })
  }
}

export const GetSinglePost = async (req, res) => {
  try {
    const data = await prisma.blog.findUnique({
      where: {
        slug: req.params.slug
      },
      include: {
        author: {
          select: {
            username: true,
            name: true,
            id: true
          }
        },
        _count: {
          select: {
            Like: true,
            Comment: true,
          },

        },
      }
    })
    return res.status(200).json(data)

  } catch (error) {
    console.log(error)
    return res.status(401).json({
      "errors": {
        "msg": "Not Found"
      }
    })

  }
}

export const GetPostByUser = async (req, res) => {
  try {
    const data = await prisma.blog.findMany({
      where: {
        authorId: req.params.id
      },
      take: 10,
      select: {
        title: true,
        id: true,
        slug: true,
        feature_image: true,
        author: {
          select: {
            id: true,
            name: true,
            username: true,
          }
        },
        _count: {
          select: {
            Like: true,
            Comment: true
          }
        }
      }
    }
    )
    return res.status(200).json(data)
  } catch (error) {
    return res.status(401).json({
      "errors": {
        "msg": "Not Found"
      }
    })
  }
}
export const CommentValidation = [
  body("content").notEmpty().withMessage("Content is Required")
]
export const CreateComment = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ "errors": errors.array() })
  }
  const { content } = req.body
  try {
    const post = await prisma.comment.create({
      data: {
        content,
        author: { connect: { id: res.locals.user.id } },
        blog: { connect: { id: req.params.id } }
      }
    })
    return res.status(201).json(post)
  } catch (error) {
    return res.status(401).json({
      "errors": {
        "msg": "Not Found"
      }
    })
  }
}

export const GetComments = async (req, res) => {
  try {

    const data = await prisma.comment.findMany({
      where: {
        blogId: req.params.id
      },
      include: {
        author: {
          select: {
            name: true,
            username: true,
            id: true,
            profile_image: true,
          }
        }
      }
    })
    return res.status(200).json(data)
  } catch (error) {

    return res.status(404).json({
      "errors": {
        "msg": "Not Found"
      }
    })
  }
}

export const DeleteComment = async (req, res) => {
  try {
    const data = await prisma.comment.findUnique({
      where: {
        id: req.params.id
      },
      include: { author: true }
    })
    if (data.author.id !== res.locals.user.id) {
      return res.status(401).json({
        "errors": {
          "msg": "Not Authorized"
        }
      })
    }
    await prisma.comment.delete({
      where: {
        id: req.params.id
      }
    })
    return res.status(200).json({
      "msg": "Comment Deleted"
    })
  } catch (error) {
    return res.status(401).json({
      "errors": {
        "msg": "Not Found"
      }
    })

  }
}

export const createLike = async (req, res) => {
  try {
    const data = await prisma.like.findFirst({
      where: {
        authorId: res.locals.user.id,
        blogId: req.params.id
      }
    })
    if (data) {
      return res.status(401).json({
        "errors": {
          "msg": "Already Liked"
        }
      })
    }
    const like = await prisma.like.create({
      data: {
        author: { connect: { id: res.locals.user.id } },
        blog: { connect: { id: req.params.id } }
      }
    })
    return res.status(201).json(like)

  } catch (error) {
    return res.status(404).json({
      "errors": {
        "msg": "Not Found"
      }
    })

  }
}

export const deleteLike = async (req, res) => {
  try {
    const data = await prisma.like.findFirst({
      where: {
        authorId: res.locals.user.id,
        blogId: req.params.id
      }
    })
    if (!data) {
      return res.status(401).json({
        "errors": {
          "msg": "Not Liked"
        }
      })
    }
    await prisma.like.delete({
      where: {
        id: data.id
      }
    })
    return res.status(200).json({
      "msg": "Like Deleted"
    })

  } catch (error) {
    return res.status(404).json({
      "errors": {
        "msg": "Not Found"
      }
    })

  }
}



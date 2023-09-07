import prisma from "../prisma/index.js";
import GenSlug from "../utility/sluggen.js";

export const CreatePackage = async (req, res) => {
  const { data } = req.body;
  const slug = GenSlug(data?.title)
  if (res.locals.user.role !== "ORG") {
    return res.status(401).json({
      "errors": {
        "msg": "Not Authorized"
      }
    })
  }

  try {
    const mypackage = await prisma.package.create({
      data: {
        title: data.title,
        content: data.content,
        feature_image: data.feature_image,
        slug: slug,
        price: parseFloat(data.price),
        tags: data.tags,
        departure: data.departure,
        duration: parseInt(data.duration),
        location: data.location,
        Seat: parseInt(data.Seat),
        aivable_seats: parseInt(data.Seat),
        from_place: data.from,
        author: {
          connect: { id: res.locals.user.id }
        }

      }

    })
    return res.status(201).json(mypackage)

  } catch (err) {
    console.log(err)
    return res.status(401).json({
      "errors": {
        "msg": err
      }
    })

  }

}







export const GetAllPackage = async (req, res) => {
  try {
    const mypackages = await prisma.package.findMany({
      take: 8,
      orderBy: {
        createdAt: "desc"
      },
      select: {
        id: true,
        feature_image: true,
        slug: true,
        price: true,
        departure: true,
        duration: true,
        createdAt: true,
        from_place: true,
        location: true,
        title: true,
        author: {
          select: {
            name: true,
            profile_photo: true
          }
        }

      }
    })
    return res.status(200).json(mypackages)
  } catch (err) {
    console.log(err)
    return res.status(401).json({
      "errors": {
        "msg": err
      }
    })

  }
}

export const GetPackageBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const mypackage = await prisma.package.findUnique({
      where: {
        slug: slug
      },
      include: {
        author: true
      }

    })
    return res.status(200).json(mypackage)

  } catch (err) {
    console.log(err)
    return res.status(401).json({
      "errors": {
        "msg": err
      }
    })


  }
}

export const SearchPackage = async (req, res) => {
  const { searchq } = req.query;
  try {
    const myData = await prisma.package.findMany({
      take: 6,
      where: {
        title: {
          search: searchq
        },
        content: {
          search: searchq
        }
      }
    })
    return res.status(200).json(myData)

  } catch (err) {
    console.log(err)
    return res.status(401).json({
      "errors": err
    })
  }
}

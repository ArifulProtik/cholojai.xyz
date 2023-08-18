import slugify from 'slugify';
import { v4 } from 'uuid'

const GenSlug = (title) => {
  const uid = v4().substring(0, 8);
  const slug = slugify(title, { lower: true });
  return `${slug}-${uid}`;
}

export default GenSlug

import { groq } from 'next-sanity'

// ── Project list (used on /projects page) ────────────────────────────────────
export const ALL_PROJECTS_QUERY = groq`
  *[_type == "project"] | order(date desc) {
    _id,
    title,
    slug,
    date,
    description,
    heroImage
  }
`

// ── Single project (used on /projects/[slug] page) ───────────────────────────
export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    date,
    description,
    projectUrl,
    timeline,
    role,
    heroImage,
    content[] {
      _type,
      _key,
      // challengeBlock
      "challengeText": text,
      // whatIDidBlock
      designItems,
      engineeringItems,
      // stackBlock
      technologies,
      // mediaBlock
      items[] {
        _key,
        image,
        caption
      },
      // statsBlock
      stats[] {
        _key,
        value,
        label
      },
      // outcomeBlock
      "outcomeText": text,
    }
  }
`

// ── All slugs (used for static params) ───────────────────────────────────────
export const ALL_SLUGS_QUERY = groq`
  *[_type == "project"] | order(date desc) {
    title,
    "slug": slug.current
  }
`

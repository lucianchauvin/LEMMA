import { courses } from '$lib/data';

export function load() {
  return {
    summaries: courses.map((course) => ({
      name: course.name,
      slug: course.slug,
      description: course.description
    }))
  };
}

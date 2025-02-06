import { courses } from '$lib/data';

export function load() {
  return {
    summaries: courses.map((course) => ({
      name: course.name,
      number: course.slug,
      description: course.description
    }))
  };
}

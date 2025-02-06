import { error } from '@sveltejs/kit';
import { courses } from '$lib/data';

export function load({ params } : {params: any}) {
  // params.course comes from the url

	const course = courses.find((course) => course.slug === params.course);


	if (!course) throw error(404);

	return {
		course
	};
}

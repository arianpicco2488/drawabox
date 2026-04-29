/**
 * Images from src/Lessons-img/warm-up-img/ mapped to WarmUpGallery exercise names.
 * Uses Vite's glob import so paths resolve from project root.
 */

const imageModules = import.meta.glob<string>(
  '/src/Lessons-img/warm-up-img/*.{jpg,jpeg}',
  { query: '?url', import: 'default', eager: true }
);

function getImageUrl(filename: string): string | undefined {
  const key = `/src/Lessons-img/warm-up-img/${filename}`;
  const withSpace = `/src/Lessons-img/warm-up-img/ ${filename}`;
  return (imageModules[key] ?? imageModules[withSpace]) as string | undefined;
}

/** Map exercise name (as in allExercises) to local warm-up image URL. */
export const warmUpImageByExerciseName: Record<string, string> = {
  'Superimposed Lines': getImageUrl('Superimposed Lines.jpg')!,
  'Ghosted Lines': getImageUrl('Ghosted Lines.jpg')!,
  'Ghosted Planes': getImageUrl('Ghosted Planes.jpg')!,
  'Tables of Ellipses': getImageUrl('Tables of Ellipses.jpg')!,
  'Ellipses in Planes': getImageUrl('Ellipses in Planes.jpg')!,
  'Funnels': getImageUrl('Funnels.jpg')!,
  'Organic Arrows': getImageUrl('Organic Arrows.jpg')!,
  'Sausages with Contour Lines': getImageUrl('Sausages with Contour Lines.jpg')!,
  'Texture Analysis': getImageUrl('Texture Analysis.jpg')!,
  'Dissections': getImageUrl('Dissections.jpg')!,
  'Form Intersections': getImageUrl('Form Intersections .jpg')!,
  'Organic Intersections': getImageUrl('Organic Intersections.jpg')!,
  'Leaves': getImageUrl('leaves.jpg')!,
  'Branches': getImageUrl('Branches.jpg')!,
  'Plant Drawings': getImageUrl('Plants.jpg')!,
  'Insect Drawings': getImageUrl('insect.jpg')!,
  'Arachnid Drawings': getImageUrl('insect.jpg')!,
  'Non-Hooved Quadrupeds': getImageUrl('non-hooved quadrupeds.jpg')!,
  'Hooved Quadrupeds': getImageUrl('hooved quadrupeds.jpeg')!,
  'Hybrids': getImageUrl('hybrids.jpg')!,
  'Everyday Objects': getImageUrl('everyday objects.jpg')!,
  'Cylinders in Boxes': getImageUrl('cylinders in boxes.jpg')!,
  'Vehicles': getImageUrl('vehicles.jpg')!,
};

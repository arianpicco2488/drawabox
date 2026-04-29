import { warmUpImageByExerciseName } from './warmUpImages';

export interface Exercise {
  name: string;
  lesson: number;
  description: string;
  imageUrl: string;
}

const baseExercises: Exercise[] = [
  // Lesson 1
  {
    name: 'Superimposed Lines',
    lesson: 1,
    description: 'Practice drawing confident, straight lines over one another to build muscle memory and control.',
    imageUrl: 'https://images.unsplash.com/photo-1765547586602-b08d698a4a9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW5jaWwlMjBza2V0Y2hpbmclMjBsaW5lcyUyMHByYWN0aWNlfGVufDF8fHx8MTc3MjgwNzQ5MXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    name: 'Ghosted Lines',
    lesson: 1,
    description: 'Draw from the shoulder using the ghosting method - plan, ghost, then execute with confidence.',
    imageUrl: 'https://images.unsplash.com/photo-1765547586602-b08d698a4a9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW5jaWwlMjBza2V0Y2hpbmclMjBsaW5lcyUyMHByYWN0aWNlfGVufDF8fHx8MTc3MjgwNzQ5MXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    name: 'Ghosted Planes',
    lesson: 1,
    description: 'Apply the ghosting method to create clean, confident quadrilateral shapes.',
    imageUrl: 'https://images.unsplash.com/photo-1727522974599-0e4a9c2a5a73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9tZXRyaWMlMjBwZXJzcGVjdGl2ZSUyMGJveGVzJTIwZHJhd2luZ3xlbnwxfHx8fDE3NzI4MDc0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    name: 'Tables of Ellipses',
    lesson: 1,
    description: 'Fill pages with ellipses in a grid to practice smooth, confident ellipse construction.',
    imageUrl: 'https://images.unsplash.com/photo-1624398891398-fbb14f1acc11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXJjdWxhciUyMGZvcm1zJTIwZWxsaXBzZXN8ZW58MXx8fHwxNzcyODA3NDkyfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    name: 'Ellipses in Planes',
    lesson: 1,
    description: 'Draw ellipses that fit snugly within plane constructions to understand 3D space.',
    imageUrl: 'https://images.unsplash.com/photo-1624398891398-fbb14f1acc11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXJjdWxhciUyMGZvcm1zJTIwZWxsaXBzZXN8ZW58MXx8fHwxNzcyODA3NDkyfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    name: 'Funnels',
    lesson: 1,
    description: 'Practice drawing ellipses of varying degrees aligned to a central minor axis.',
    imageUrl: 'https://images.unsplash.com/photo-1624398891398-fbb14f1acc11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXJjdWxhciUyMGZvcm1zJTIwZWxsaXBzZXN8ZW58MXx8fHwxNzcyODA3NDkyfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  // Lesson 2
  {
    name: 'Organic Arrows',
    lesson: 2,
    description: 'Draw flowing arrows that twist through 3D space, practicing foreshortening.',
    imageUrl: 'https://images.unsplash.com/photo-1622593587600-919f704f4ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZmxvd2luZyUyMHNoYXBlc3xlbnwxfHx8fDE3NzI4MDc0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    name: 'Sausages with Contour Lines',
    lesson: 2,
    description: 'Draw simple sausage forms and wrap contour lines around them to convey volume.',
    imageUrl: 'https://images.unsplash.com/photo-1622593587600-919f704f4ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZmxvd2luZyUyMHNoYXBlc3xlbnwxfHx8fDE3NzI4MDc0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    name: 'Texture Analysis',
    lesson: 2,
    description: 'Study reference textures closely and practice implying detail rather than outlining it.',
    imageUrl: 'https://images.unsplash.com/photo-1770284254752-e5fec40e964b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0dXJlJTIwc3VyZmFjZSUyMG1hY3JvfGVufDF8fHx8MTc3MjgwNzQ5M3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    name: 'Dissections',
    lesson: 2,
    description: 'Fill organic form boxes with various textures to develop your visual library.',
    imageUrl: 'https://images.unsplash.com/photo-1770284254752-e5fec40e964b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0dXJlJTIwc3VyZmFjZSUyMG1hY3JvfGVufDF8fHx8MTc3MjgwNzQ5M3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    name: 'Form Intersections',
    lesson: 2,
    description: 'Draw primitive forms intersecting in space to understand how forms interact.',
    imageUrl: 'https://images.unsplash.com/photo-1727522974599-0e4a9c2a5a73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9tZXRyaWMlMjBwZXJzcGVjdGl2ZSUyMGJveGVzJTIwZHJhd2luZ3xlbnwxfHx8fDE3NzI4MDc0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    name: 'Organic Intersections',
    lesson: 2,
    description: 'Stack organic sausage forms to practice how soft forms rest and interact with each other.',
    imageUrl: 'https://images.unsplash.com/photo-1622593587600-919f704f4ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZmxvd2luZyUyMHNoYXBlc3xlbnwxfHx8fDE3NzI4MDc0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    name: 'Organic Forms with Contour Curves',
    lesson: 2,
    description: 'Practice wrapping contour curves around organic forms to show their three-dimensional nature.',
    imageUrl: 'https://images.unsplash.com/photo-1622593587600-919f704f4ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZmxvd2luZyUyMHNoYXBlc3xlbnwxfHx8fDE3NzI4MDc0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  // Lesson 3
  {
    name: 'Leaves',
    lesson: 3,
    description: 'Study and draw various leaf structures using basic construction principles.',
    imageUrl: 'https://images.unsplash.com/photo-1544194034-ffa4ad2b4361?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBsZWFmJTIwc3RydWN0dXJlfGVufDF8fHx8MTc3MjgwNzQ5M3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    name: 'Branches',
    lesson: 3,
    description: 'Practice constructing branch structures with proper organic forms and flow.',
    imageUrl: 'https://images.unsplash.com/photo-1763898333132-8e5ebb10c3c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVlJTIwYnJhbmNoZXMlMjBuYXR1cmFsfGVufDF8fHx8MTc3MjgwNzQ5M3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    name: 'Plant Drawings',
    lesson: 3,
    description: 'Apply construction techniques to draw complete plant forms from reference.',
    imageUrl: 'https://images.unsplash.com/photo-1544194034-ffa4ad2b4361?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBsZWFmJTIwc3RydWN0dXJlfGVufDF8fHx8MTc3MjgwNzQ5M3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  // Lesson 4
  {
    name: 'Insect Drawings',
    lesson: 4,
    description: 'Break down insect anatomy and construct them using basic forms.',
    imageUrl: 'https://images.unsplash.com/photo-1770224775397-24124d94544a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnNlY3QlMjBhbmF0b215JTIwZGV0YWlsZWR8ZW58MXx8fHwxNzcyODA3NDk0fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    name: 'Arachnid Drawings',
    lesson: 4,
    description: 'Apply construction methods to draw spiders and other arachnids.',
    imageUrl: 'https://images.unsplash.com/photo-1770224775397-24124d94544a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnNlY3QlMjBhbmF0b215JTIwZGV0YWlsZWR8ZW58MXx8fHwxNzcyODA3NDk0fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  // Lesson 5
  {
    name: 'Birds',
    lesson: 5,
    description: 'Study bird anatomy and construct various bird forms and poses.',
    imageUrl: 'https://images.unsplash.com/photo-1693675195149-54c5da4b9319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJkJTIwZmVhdGhlcnMlMjBjbG9zZXVwfGVufDF8fHx8MTc3MjgwNzQ5Nnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    name: 'Non-Hooved Quadrupeds',
    lesson: 5,
    description: 'Draw animals like cats, dogs, and bears using construction techniques.',
    imageUrl: 'https://images.unsplash.com/photo-1760008787138-2e5a26626d1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZSUyMGFuaW1hbCUyMGFuYXRvbXl8ZW58MXx8fHwxNzcyODA3NDk3fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    name: 'Hooved Quadrupeds',
    lesson: 5,
    description: 'Apply construction to animals like horses, deer, and cattle.',
    imageUrl: 'https://images.unsplash.com/photo-1760008787138-2e5a26626d1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZSUyMGFuaW1hbCUyMGFuYXRvbXl8ZW58MXx8fHwxNzcyODA3NDk3fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    name: 'Random Animals of Your Choice',
    lesson: 5,
    description: 'Choose any animal and practice applying all construction techniques learned.',
    imageUrl: 'https://images.unsplash.com/photo-1760008787138-2e5a26626d1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZSUyMGFuaW1hbCUyMGFuYXRvbXl8ZW58MXx8fHwxNzcyODA3NDk3fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    name: 'Hybrids',
    lesson: 5,
    description: 'Create imaginative hybrid creatures while maintaining believable anatomy.',
    imageUrl: 'https://images.unsplash.com/photo-1693675195149-54c5da4b9319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJkJTIwZmVhdGhlcnMlMjBjbG9zZXVwfGVufDF8fHx8MTc3MjgwNzQ5Nnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  // Lesson 6
  {
    name: 'Everyday Objects',
    lesson: 6,
    description: 'Apply construction to common household and everyday objects.',
    imageUrl: 'https://images.unsplash.com/photo-1760445799125-b7441f91cc07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZWhvbGQlMjBvYmplY3RzJTIwc3RpbGwlMjBsaWZlfGVufDF8fHx8MTc3MjgwNzQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  // Lesson 7
  {
    name: 'Cylinders in Boxes',
    lesson: 7,
    description: 'Practice constructing cylinders within box forms for precision.',
    imageUrl: 'https://images.unsplash.com/photo-1727522974599-0e4a9c2a5a73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9tZXRyaWMlMjBwZXJzcGVjdGl2ZSUyMGJveGVzJTIwZHJhd2luZ3xlbnwxfHx8fDE3NzI4MDc0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    name: 'Vehicles',
    lesson: 7,
    description: 'Apply all construction techniques to draw various vehicles and machinery.',
    imageUrl: 'https://images.unsplash.com/photo-1764122623556-90a7d480df53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB2ZWhpY2xlJTIwbWVjaGFuaWNhbHxlbnwxfHx8fDE3NzI4MDc0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

/** Warm-up gallery exercises with local images from Lessons-img/warm-up-img/ when available. */
export const allExercises: Exercise[] = baseExercises.map((e) => {
  const localImg = warmUpImageByExerciseName[e.name];
  return { ...e, imageUrl: localImg && localImg.length > 0 ? localImg : e.imageUrl };
});

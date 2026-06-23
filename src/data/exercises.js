// GymGenie exercise library (20 moves).
// Self-contained static data — no runtime API, so the app never breaks on a
// third-party outage. Each exercise ships two real demonstration frames
// (start / end position) bundled locally under public/exercises/<id>/,
// sourced from the public-domain free-exercise-db dataset.

// Muscle groups (used by the personalisation engine for the training split).
export const MUSCLES = ['Chest', 'Back', 'Shoulders', 'Legs', 'Arms', 'Core']

export const EXERCISES = [
  { id: 'dumbbell-bench-press', name: 'Dumbbell Bench Press', muscle: 'Chest', tags: ['Chest', 'Triceps'], equipment: 'Dumbbell', level: 'Beginner', compound: true,
    instructions: ['Lie flat on a bench with feet planted firmly on the floor.', 'Hold a dumbbell in each hand at chest level, palms facing forward.', 'Press the weights up until your arms are fully extended.', 'Lower slowly to the sides of your chest in a controlled motion.', 'Keep your core braced and avoid arching your back.'] },
  { id: 'push-up', name: 'Push-Up', muscle: 'Chest', tags: ['Chest', 'Core'], equipment: 'Bodyweight', level: 'Beginner', compound: true,
    instructions: ['Start in a high plank with hands slightly wider than shoulders.', 'Keep your body in a straight line from head to heels.', 'Lower your chest toward the floor by bending the elbows.', 'Press back up until your arms are straight.', 'Maintain a tight core throughout.'] },
  { id: 'incline-dumbbell-press', name: 'Incline Dumbbell Press', muscle: 'Chest', tags: ['Chest', 'Shoulders'], equipment: 'Dumbbell', level: 'Intermediate', compound: true,
    instructions: ['Set a bench to a 30–45° incline and sit back.', 'Hold a dumbbell in each hand at upper-chest height.', 'Press the weights overhead until arms are extended.', 'Lower under control to the top of your chest.', 'Keep your shoulder blades retracted.'] },
  { id: 'dumbbell-chest-fly', name: 'Dumbbell Chest Fly', muscle: 'Chest', tags: ['Chest'], equipment: 'Dumbbell', level: 'Intermediate', compound: false,
    instructions: ['Lie on a flat bench holding dumbbells above your chest.', 'Keep a slight bend in the elbows throughout.', 'Open your arms wide in an arc until you feel a stretch.', 'Squeeze your chest to bring the weights back together.', 'Move slowly and avoid letting elbows drop too low.'] },
  { id: 'one-arm-dumbbell-row', name: 'One-Arm Dumbbell Row', muscle: 'Back', tags: ['Back', 'Biceps'], equipment: 'Dumbbell', level: 'Beginner', compound: true,
    instructions: ['Place one knee and hand on a bench, back flat.', 'Hold a dumbbell in the free hand, arm extended.', 'Pull the weight to your hip, elbow close to your body.', 'Squeeze your back at the top, then lower slowly.', 'Avoid twisting your torso as you row.'] },
  { id: 'dumbbell-deadlift', name: 'Dumbbell Deadlift', muscle: 'Back', tags: ['Back', 'Legs'], equipment: 'Dumbbell', level: 'Intermediate', compound: true,
    instructions: ['Stand with dumbbells in front of your thighs.', 'Hinge at the hips and lower the weights along your legs.', 'Keep your back flat and chest up throughout.', 'Drive through your heels to stand back up.', 'Squeeze your glutes at the top.'] },
  { id: 'dumbbell-pullover', name: 'Dumbbell Pullover', muscle: 'Back', tags: ['Back', 'Chest'], equipment: 'Dumbbell', level: 'Intermediate', compound: false,
    instructions: ['Lie on a bench holding one dumbbell over your chest.', 'Keep a slight bend in the elbows.', 'Lower the weight back behind your head in an arc.', 'Pull it back over your chest using your lats.', 'Keep your hips stable and core engaged.'] },
  { id: 'superman', name: 'Superman', muscle: 'Back', tags: ['Back', 'Core'], equipment: 'Bodyweight', level: 'Beginner', compound: false,
    instructions: ['Lie face down with arms extended overhead.', 'Lift your arms, chest and legs off the floor together.', 'Hold briefly at the top, squeezing your lower back.', 'Lower under control back to the floor.', 'Keep your neck neutral throughout.'] },
  { id: 'dumbbell-shoulder-press', name: 'Dumbbell Shoulder Press', muscle: 'Shoulders', tags: ['Shoulders', 'Triceps'], equipment: 'Dumbbell', level: 'Beginner', compound: true,
    instructions: ['Sit or stand holding dumbbells at shoulder height.', 'Brace your core and keep your back straight.', 'Press the weights overhead until arms are extended.', 'Lower under control back to shoulder level.', 'Avoid flaring the elbows too far forward.'] },
  { id: 'dumbbell-lateral-raise', name: 'Dumbbell Lateral Raise', muscle: 'Shoulders', tags: ['Shoulders'], equipment: 'Dumbbell', level: 'Beginner', compound: false,
    instructions: ['Stand holding a dumbbell in each hand by your sides.', 'Keep a slight bend in the elbows.', 'Raise the weights out to the sides to shoulder height.', 'Pause, then lower slowly under control.', 'Avoid using momentum or shrugging.'] },
  { id: 'dumbbell-front-raise', name: 'Dumbbell Front Raise', muscle: 'Shoulders', tags: ['Shoulders'], equipment: 'Dumbbell', level: 'Beginner', compound: false,
    instructions: ['Stand holding dumbbells in front of your thighs.', 'Keep your arms straight with a slight elbow bend.', 'Raise one or both weights to shoulder height.', 'Lower slowly under control.', 'Keep your torso still — no swinging.'] },
  { id: 'pike-push-up', name: 'Pike Push-Up', muscle: 'Shoulders', tags: ['Shoulders', 'Triceps'], equipment: 'Bodyweight', level: 'Intermediate', compound: true,
    instructions: ['Start in a downward-dog position, hips high.', 'Place your hands shoulder-width apart.', 'Bend your elbows to lower the top of your head toward the floor.', 'Press back up until arms are straight.', 'Keep your hips high throughout.'] },
  { id: 'dumbbell-goblet-squat', name: 'Dumbbell Goblet Squat', muscle: 'Legs', tags: ['Legs', 'Core'], equipment: 'Dumbbell', level: 'Beginner', compound: true,
    instructions: ['Hold one dumbbell vertically against your chest.', 'Stand with feet shoulder-width apart.', 'Squat down keeping your chest up and back straight.', 'Descend until thighs are about parallel to the floor.', 'Drive through your heels to stand back up.'] },
  { id: 'dumbbell-lunge', name: 'Dumbbell Lunge', muscle: 'Legs', tags: ['Legs', 'Glutes'], equipment: 'Dumbbell', level: 'Beginner', compound: true,
    instructions: ['Stand tall holding a dumbbell in each hand.', 'Step forward with one leg and lower your hips.', 'Bend both knees to about 90 degrees.', 'Push through the front heel to return to standing.', 'Alternate legs and keep your torso upright.'] },
  { id: 'bodyweight-squat', name: 'Bodyweight Squat', muscle: 'Legs', tags: ['Legs'], equipment: 'Bodyweight', level: 'Beginner', compound: true,
    instructions: ['Stand with feet shoulder-width apart.', 'Extend your arms forward for balance.', 'Sit your hips back and down, knees tracking over toes.', 'Descend until thighs are parallel to the floor.', 'Stand back up squeezing your glutes.'] },
  { id: 'dumbbell-romanian-deadlift', name: 'Dumbbell Romanian Deadlift', muscle: 'Legs', tags: ['Legs', 'Back'], equipment: 'Dumbbell', level: 'Intermediate', compound: true,
    instructions: ['Hold dumbbells in front of your thighs.', 'Keep a soft bend in the knees throughout.', 'Hinge at the hips, pushing them back.', 'Lower the weights along your shins until you feel a hamstring stretch.', 'Drive your hips forward to return upright.'] },
  { id: 'dumbbell-biceps-curl', name: 'Dumbbell Biceps Curl', muscle: 'Arms', tags: ['Arms', 'Biceps'], equipment: 'Dumbbell', level: 'Beginner', compound: false,
    instructions: ['Stand holding a dumbbell in each hand, arms extended.', 'Keep your elbows pinned to your sides.', 'Curl the weights up toward your shoulders.', 'Squeeze your biceps at the top.', 'Lower slowly under control.'] },
  { id: 'dumbbell-triceps-extension', name: 'Dumbbell Triceps Extension', muscle: 'Arms', tags: ['Arms', 'Triceps'], equipment: 'Dumbbell', level: 'Beginner', compound: false,
    instructions: ['Hold one dumbbell overhead with both hands.', 'Keep your elbows close to your head.', 'Lower the weight behind your head by bending the elbows.', 'Extend your arms to press it back up.', 'Keep your upper arms still throughout.'] },
  { id: 'plank', name: 'Plank', muscle: 'Core', tags: ['Core'], equipment: 'Bodyweight', level: 'Beginner', compound: false,
    instructions: ['Rest on your forearms and toes, elbows under shoulders.', 'Keep your body in a straight line from head to heels.', 'Brace your core and squeeze your glutes.', 'Avoid letting your hips sag or pike up.', 'Hold for the prescribed time, breathing steadily.'] },
  { id: 'dumbbell-russian-twist', name: 'Dumbbell Russian Twist', muscle: 'Core', tags: ['Core'], equipment: 'Dumbbell', level: 'Intermediate', compound: false,
    instructions: ['Sit on the floor holding one dumbbell at your chest.', 'Lean back slightly and lift your feet if able.', 'Rotate your torso to tap the weight to one side.', 'Rotate to the other side under control.', 'Keep your core braced throughout.'] },
].map((ex) => ({
  ...ex,
  // Two demonstration frames bundled locally (relative to the deploy root).
  start: `exercises/${ex.id}/0.jpg`,
  end: `exercises/${ex.id}/1.jpg`,
  image: `exercises/${ex.id}/0.jpg`,
}))

export const getExerciseById = (id) => EXERCISES.find((e) => e.id === id)

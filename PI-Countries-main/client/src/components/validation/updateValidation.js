export default function updateValidate({
   
   difficulty,
   duration,
   
   }) {
   var errors = {};

   if (duration > 24 || duration < 1) {
      errors.duration = 'The duration needs a time no longer than 24 hours';
   }

   if (difficulty > 5 || difficulty < 1)
      errors.difficulty = 'The difficulty must be between 1 and 5';

   return errors;
   }

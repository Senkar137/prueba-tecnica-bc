import { createAction, props } from '@ngrx/store';
import { TrainerProfile } from '../../interfaces/trainer-profile';

export const loadTrainerInfo = createAction('[Trainer] Load Trainer Info');
export const loadTrainerImage = createAction('[Trainer] Load Trainer Image');

export const loadTrainerInfoSuccess = createAction(
  '[Trainer] Load Trainer Info Success',
  props<{ info: TrainerProfile }>()
);
export const loadTrainerImageSuccess = createAction(
  '[Trainer] Load Trainer Image Success',
  props<{ image: string | null; name?: string }>()
);

export const loadTrainerInfoFailure = createAction(
  '[Trainer] Load Trainer Info Failure',
  props<{ error: string }>()
);
export const loadTrainerImageFailure = createAction(
  '[Trainer] Load Trainer Image Failure',
  props<{ error: string }>()
);

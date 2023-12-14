// pokemon.state.ts
import { createReducer, on } from '@ngrx/store';
import {
  loadTrainerInfo,
  loadTrainerImage,
  loadTrainerInfoSuccess,
  loadTrainerImageSuccess,
  loadTrainerInfoFailure,
  loadTrainerImageFailure,
} from '../actions/trainer.actions';
import { TrainerProfile } from '../../interfaces/trainer-profile';

export interface TrainerState {
  trainer: TrainerProfile | null;
  loading: boolean;
  error: string | null;
}

export const initialState: TrainerState = {
  trainer: null,
  loading: false,
  error: null,
};

export const trainerReducer = createReducer(
  initialState,
  on(loadTrainerInfo, state => ({ ...state, loading: true })),
  on(loadTrainerInfoSuccess, (state, { info }) => ({
    ...state,
    trainer: {
      ...info,
      imageUrl: state.trainer ? state.trainer.imageUrl : info.imageUrl,
    },
    loading: false,
  })),
  on(loadTrainerInfoFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(loadTrainerImage, state => ({ ...state, loading: true })),
  on(loadTrainerImageSuccess, (state, { image }) => ({
    ...state,
    trainer: { ...state.trainer, imageUrl: image },
    loading: false,
  })),
  on(loadTrainerImageFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

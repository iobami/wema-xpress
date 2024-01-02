import stub from './stub.json';

type Verifier = ReturnType<() => typeof stub[0]>;

export interface VerifiersResponse {
  data: Verifier[]
}

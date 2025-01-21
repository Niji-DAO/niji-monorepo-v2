import axios from 'axios';
import * as R from 'ramda';
import config from '../src/config';
import { bigNumbersEqual } from './utils';

export interface NormalizedVote {
  proposalId: number;
  supportDetailed: number;
}

export interface Seed {
  background: number;
  backDecoration: number;
  backgroundDecoration: number;
  special: number;
  leftHand: number;
  back: number;
  clothe: number;
  choker: number;
  ear: number;
  hair: number;
  headphones: number;
  hat: number;
}

export interface NormalizedNoun {
  id: number;
  owner: string;
  delegatedTo: null | string;
  votes: NormalizedVote[];
  seed: Seed;
}

const nounsGql = `
{
  nouns {
    id
    owner {
      id
	    delegate {
		    id
	    }
    }
    votes {
      proposal {
        id
      }
      supportDetailed
    }
    seed {
      background
      backDecoration
      backgroundDecoration
      special
      leftHand
      back
      clothe
      choker
      ear
      hair
      headphones
      hat
    }
  }
}
`;

export const normalizeVote = (vote: any): NormalizedVote => ({
  proposalId: Number(vote.proposal.id),
  supportDetailed: Number(vote.supportDetailed),
});

export const normalizeSeed = (seed: any): Seed => ({
  background: Number(seed.background),
  backDecoration: Number(seed.backDecoration),
  backgroundDecoration: Number(seed.backgroundDecoration),
  special: Number(seed.special),
  leftHand: Number(seed.leftHand),
  back: Number(seed.back),
  clothe: Number(seed.clothe),
  choker: Number(seed.choker),
  ear: Number(seed.ear),
  hair: Number(seed.hair),
  headphones: Number(seed.headphones),
  hat: Number(seed.hat),
});

export const normalizeNoun = (noun: any): NormalizedNoun => ({
  id: Number(noun.id),
  owner: noun.owner.id,
  delegatedTo: noun.owner.delegate?.id,
  votes: normalizeVotes(noun.votes),
  seed: normalizeSeed(noun.seed),
});

export const normalizeNouns = R.map(normalizeNoun);

export const normalizeVotes = R.map(normalizeVote);

export const ownerFilterFactory = (address: string) =>
  R.filter((noun: any) => bigNumbersEqual(address, noun.owner));

export const isNounOwner = (address: string, nouns: NormalizedNoun[]) =>
  ownerFilterFactory(address)(nouns).length > 0;

export const delegateFilterFactory = (address: string) =>
  R.filter((noun: any) => noun.delegatedTo && bigNumbersEqual(address, noun.delegatedTo));

export const isNounDelegate = (address: string, nouns: NormalizedNoun[]) =>
  delegateFilterFactory(address)(nouns).length > 0;

export const nounsQuery = async () =>
  normalizeNouns(
    (await axios.post(config.app.subgraphApiUri, { query: nounsGql })).data.data.nouns,
  );

import type HitType from './HitType';
import type { Hand } from './_structs';

export default class HandpanHit {
	public readonly hit_type: HitType;
	public readonly hand: Hand;

	private constructor(hit_type: HitType, hand: Hand) {
		this.hit_type = hit_type;
		this.hand = hand;
	}
}

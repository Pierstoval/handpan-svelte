export default class Sound {
	private url = '';

	private buffer: null | AudioBuffer = null;

	private static sources: Array<AudioBufferSourceNode> = [];

	private static context: AudioContext;

	constructor(url: string) {
		if (!Sound.context) {
			Sound.context = new AudioContext();
		}
		this.url = url;
	}

	public load() {
		if (!this.url) return Promise.reject(new Error(`Missing or invalid URL: ${this.url}`));

		if (this.buffer) return Promise.resolve(this.buffer);

		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();

			request.open('GET', this.url, true);
			request.responseType = 'arraybuffer';

			// Decode asynchronously:

			request.onload = () => {
				Sound.context.decodeAudioData(request.response, (buffer) => {
					if (!buffer) {
						console.log(`Sound decoding error: ${this.url}`);

						reject(new Error(`Sound decoding error: ${this.url}`));

						return;
					}

					this.buffer = buffer;

					resolve(buffer);
				});
			};

			request.onerror = (err) => {
				console.log('Sound XMLHttpRequest error:', err);

				reject(err);
			};

			request.send();
		});
	}

	public play(volume = 1, time = 0, onEnded: null | (() => unknown)) {
		if (!this.buffer) return;

		// Sound.context.resume().then(() => {
		//     console.info('Audio context resumed');
		// }).catch((err) => {
		//     console.error('Error resuming audio context:', err);
		// });

		// Create a new sound source and assign it the loaded sound's buffer:

		const source = Sound.context.createBufferSource();

		source.buffer = this.buffer;

		// Keep track of all sources created, and stop tracking them once they finish playing:

		const insertedAt = Sound.sources.push(source) - 1;

		source.onended = () => {
			console.info('source ended:', source);
			if (onEnded) {
				onEnded();
			}

			source.stop(0);

			Sound.sources.splice(insertedAt, 1);
		};

		// Create a gain node with the desired volume:

		const gainNode = Sound.context.createGain();

		gainNode.gain.value = volume;

		// Connect nodes:

		source.connect(gainNode).connect(Sound.context.destination);

		// Start playing at the desired time:

		source.start(time);
	}

	stop() {
		Sound.context
			.close()
			.then(() => {
				console.info('Audio context suspended, stopping all sources.');
			})
			.catch((err) => {
				console.error('Error suspending audio context:', err);
			});

		// Stop any sources still playing:
		Sound.sources.forEach((source) => {
			source.stop(0);
		});

		Sound.sources = [];
	}
}

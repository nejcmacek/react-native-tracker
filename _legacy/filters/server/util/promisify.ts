
type callback<T, S> = (err: S, value: T) => void;

function promisify<T = any, S = any>(cb: (cb: callback<T, S>) => void);
function promisify<T = any, S = any>(fn: () => void, args: any[]);
function promisify<T, S>(fn, args?) {
	if (args)
		return new Promise<T>((resolve, reject) => {
			fn.call(this, ...args, (err, value) => {
				if (err)
					reject(err)
				else
					resolve(value)
			})
		})
	else
		return new Promise<T>((resolve, reject) => {
			fn((err, value) => {
				if (err)
					reject(err)
				else
					resolve(value)
			})
		})
}

export default promisify;

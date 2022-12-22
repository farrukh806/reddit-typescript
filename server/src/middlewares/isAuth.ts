import { MiddlewareFn } from 'type-graphql';
import { MyContext } from 'src/contextTypes';

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
	if (!context.req.session.userId) {
		throw new Error('not authenticated');
	}
	return next();
};

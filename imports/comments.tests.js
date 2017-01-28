/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
const Comments = new Mongo.Collection('comments');
if (Meteor.isServer) {
  describe('Comments', function(){
    describe('methods',function(){
      const userId = Random.id();
      let commentId;

      beforeEach(function(){
      Comments.remove({});
      commentId = Comments.insert({
			text: 'test comment',
			owner: userId,
			email: 'vijaypaliitrrrp@gmail.com',
			createdAt: new Date()
		});
      });
      it('can delete its own comment', function(){
        const removeComment = Meteor.server.method_handlers['/comments/remove'];
        const invocation = { userId };
        removeComment.apply(invocation, [commentId]);
        assert.equal(Comments.find().count(), 0);
      });
    });
  });
}
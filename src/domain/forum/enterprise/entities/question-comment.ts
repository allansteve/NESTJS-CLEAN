import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import {
  Comment,
  CommentsProps,
} from '@/domain/forum/enterprise/entities/comments'

export interface QuestionCommentsProps extends CommentsProps {
  questionId: UniqueEntityID
}

export class QuestionComment extends Comment<QuestionCommentsProps> {
  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<QuestionCommentsProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return questionComment
  }
}

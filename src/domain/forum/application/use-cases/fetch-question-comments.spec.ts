import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestionComment } from '../../../../../test/factories/make-question-comment'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { InMemoryQuestionsCommentsRepository } from '../../../../../test/repositories/in-memory-question-comments-repository'

let inMemoryQuestionCommetsRepository: InMemoryQuestionsCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Recent Comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommetsRepository =
      new InMemoryQuestionsCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommetsRepository)
  })

  it('should be able to fetch question commentss', async () => {
    await inMemoryQuestionCommetsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('question-1') }),
    )
    await inMemoryQuestionCommetsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('question-1') }),
    )
    await inMemoryQuestionCommetsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('question-1') }),
    )

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.questionComments).toHaveLength(3)
  })

  it('should be able to delete a question comment', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommetsRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityID('question-1') }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.questionComments).toHaveLength(2)
  })
})

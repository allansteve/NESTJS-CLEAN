import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from '../../../../../test/factories/make-answer-comment'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { InMemoryAnswersCommentsRepository } from '../../../../../test/repositories/in-memory-answers-comments-repository'

let inMemoryAnswerCommetsRepository: InMemoryAnswersCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Recent Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommetsRepository = new InMemoryAnswersCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommetsRepository)
  })

  it('should be able to fetch answer commentss', async () => {
    await inMemoryAnswerCommetsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }),
    )
    await inMemoryAnswerCommetsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }),
    )
    await inMemoryAnswerCommetsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }),
    )

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.value?.answerComments).toHaveLength(3)
  })

  it('should be able to delete a answer comment', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommetsRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.value?.answerComments).toHaveLength(2)
  })
})

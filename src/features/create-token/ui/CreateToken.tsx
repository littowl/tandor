import {
  Button,
  Flex,
  Modal,
  NumberInput,
  Stack,
  TextInput,
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import { createToken } from 'entities/token/api'
import { useTokensStore } from 'entities/token/model'

export const CreateToken = () => {
  const getTokens = useTokensStore((state) => state.getTokens)
  const [modalOpened, { open, close }] = useDisclosure(false)
  const [name, setName] = useState('')
  const [count, setCount] = useState<number | ''>(1)
  const [date, setDate] = useState<Date>(new Date())

  return (
    <>
      <Modal
        centered
        opened={modalOpened}
        onClose={close}
        title="Создание токена"
        sx={{
          '.mantine-Modal-content': {
            height: '600px',
          },
          '.mantine-Modal-body': {
            height: '80%',
          },
        }}
      >
        <Stack spacing={20}>
          <TextInput
            placeholder="Введите имя"
            label="Имя токена"
            sx={{
              '.mantine-TextInput-input': {
                background: 'white',
              },
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <NumberInput
            placeholder="Введите число"
            label="Количество использований токена"
            sx={{
              '.mantine-TextInput-input': {
                background: 'white',
              },
            }}
            value={count}
            onChange={(e) => setCount(e)}
          />
          <DatePickerInput
            lang="ru"
            placeholder="Выберите дату"
            label="Срок годности токена"
            value={date}
            onChange={(e) => e && setDate(e)}
          />
          <Flex gap={20} justify="end" align="flex-end" mt="58%">
            <Button
              onClick={() => {
                createToken(name, Number(count), date).then(() => {
                  getTokens()
                  close()
                })
              }}
              disabled={!name || !count || !date}
            >
              Создать
            </Button>
            <Button variant="outline" onClick={close}>
              Отмена
            </Button>
          </Flex>
        </Stack>
      </Modal>
      <Button onClick={open}>Создать токен</Button>
    </>
  )
}

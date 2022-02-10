import React, { FC, useCallback, useState } from 'react'
import styles from './SignInModal.module.scss'
import { Button, InputBox } from '@src/components/common'
import { useCloseModal, useSignUpModal } from '@src/context/ModalContext'
import { isValidEmail, isValidPassword } from '@src/utils/check'
import { useRouter } from 'next/router'
import { ToastError } from '@src/utils/toast'
import { useLogin } from '@src/context/UserAuthContext'

const SignInModal: FC = () => {
  const router = useRouter()
  const login = useLogin()
  const openSignUpModal = useSignUpModal()
  const closeModal = useCloseModal()

  const [Inputs, setInputs] = useState({
    email: '',
    password: '',
  })

  const [isValid, setValidity] = useState({
    email: false,
    password: false,
  })

  const handleOnChange = useCallback((e) => {
    const { name, value } = e.target
    if (name === 'email') {
      setValidity((prev) => ({
        ...prev,
        email: isValidEmail(value),
      }))
    } else if (name === 'password') {
      setValidity((prev) => ({
        ...prev,
        password: isValidPassword(value),
      }))
    }
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  const handleSubmit = useCallback(async () => {
    if (!isValid.email || !isValid.password) {
      ToastError('입력값을 확인해주세요')
      return
    }
    try {
      await login(Inputs.email, Inputs.password)
      closeModal()
      router.push('/')
    } catch (error) {
      ToastError('로그인에 실패했습니다.')
    }
  }, [Inputs.email, Inputs.password, closeModal, isValid.email, isValid.password, login, router])

  return (
    <div className={styles.cnt}>
      <InputBox
        type="email"
        name="email"
        label="Email"
        placeholder="이메일"
        value={Inputs.email}
        onChange={handleOnChange}
        error={!isValid.email}
      />
      <InputBox
        type="password"
        name="password"
        label="Password"
        placeholder="(7~16자리 숫자,영문 포함)"
        value={Inputs.password}
        onChange={handleOnChange}
        error={!isValid.password}
      />
      <Button fullWidth btnStyles="primary" type="submit" onClick={handleSubmit}>
        로그인
      </Button>
      <span className=" text-xs text-gray-400" onClick={() => openSignUpModal()}>
        회원가입
      </span>
    </div>
  )
}

export default SignInModal

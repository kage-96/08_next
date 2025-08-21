"use client";
import React, { useState, type ChangeEvent, type FormEvent } from 'react'
import { Label } from './_components/Label';
import { FormGroup } from './_components/FormGroup';
import { ErrorMessage } from './_components/ErrorMessage';
import { Input } from './_components/Input';

export default function Page(){
  const url = 'https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts';
  const [isSubmitting, setIsSubmitting ] = useState<boolean>(false);
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const [nameErrorMessage, setNameErrorMessage] = useState<string>("")
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("")
  const [messageErrorMessage, setMessageErrorMessage] = useState<string>("")


  const checkEmail = (email: string) => {
    return /^[\w.-]+@[\w.-]+\.\w+$/.test(email);
  };

  // バリデーション関数
  const validate = () => {
    let isValid = true;
    let nameError = ""
    let emailError = ""
    let messageError = ""

    if (!name.trim()) {
      nameError = "お名前は必須です。";
      isValid = false;
    } else if (name.length > 30) {
      nameError = "名前は30文字以内で入力してください";
      isValid = false;
    }

    if (!email.trim()) {
      emailError = "メールアドレスは必須です。";
      isValid = false;
    } else if (!checkEmail(email)) {
      emailError = "メールアドレスの形式が正しくありません";
      isValid = false;
    }

    if (!message.trim()) {
      messageError = "本文は必須です。";
      isValid = false;
    } else if (message.length > 500) {
      messageError = "本文は500文字以内で入力してください";
      isValid = false;
    }

    setNameErrorMessage(nameError)
    setEmailErrorMessage(emailError)
    setMessageErrorMessage(messageError)

    return isValid;
  };
  // 送信イベント
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!validate()) return;

    setIsSubmitting(true);
      // エラーなし → 送信処理
    const fetchData = async () => {
      try{
        await fetch(url,{
          method:'POST',
          body:JSON.stringify({name,email,message}),
        });

        alert("送信成功！");
        handleClear();

      }catch(err){
        console.log(err)
      }finally{
        setIsSubmitting(false);
      }
    }
    fetchData();
  };

  const handleClear = () => {
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <div className="max-w-[800px] py-10 mx-auto">
      <h1 className='text-xl font-bold mb-10'>問い合わせフォーム</h1>

      <form onSubmit={handleSubmit}>

        <FormGroup>
          <Label text='お名前' htmlFor='name' />
          <div className='w-full'>
            <Input type="text" id='name' onChange={(value) => setName(value) } value={name} isSubmitting={isSubmitting} />
            <ErrorMessage message={nameErrorMessage} />
          </div>
        </FormGroup>

        <FormGroup>
          <Label text='メールアドレス' htmlFor='email' />
          <div className='w-full'>
            <Input type="email" value={email} id='email' onChange={(value) => setEmail(value) } isSubmitting={isSubmitting} />
            <ErrorMessage message={emailErrorMessage} />
          </div>
        </FormGroup>
        
        <FormGroup>
          <Label text='本文' htmlFor='content' />
          <div className='w-full'>
            <textarea className='w-full border border-gray-300 rounded-lg p-4' rows={8} id="content" onChange={(e) => setMessage(e.target.value) } value={message} readOnly={isSubmitting}></textarea>
            <ErrorMessage message={messageErrorMessage} />
          </div>
        </FormGroup>

        <div className="flex justify-center mt-10">
          <button className="bg-gray-800 text-white font-bold py-2 px-4 rounded-lg mr-4" type='submit' disabled={isSubmitting}>送信</button>
          <button className="bg-gray-200 font-bold py-2 px-4 rounded-lg" type='button' onClick={handleClear} disabled={isSubmitting}>クリア</button>
        </div>

      </form>
    </div>
  )
}

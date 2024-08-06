import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import PropTypes from 'prop-types';
import InputField from '~/components/form-controls/InputField';
import TextAreaField from '~/components/form-controls/TextAreaField';
import { useEffect, useState } from 'react';

QuestionAndAnswer.propTypes = {};

function QuestionAndAnswer(props) {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    question: '',
    answer: '',
  });
  const [questionsList, setQuestionsList] = useState([]);
  const [replyingQuestion, setReplyingQuestion] = useState(null);

  const schema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập họ tên người dùng.'),
    email: yup.string().required('Vui lòng nhập email người dùng.'),
    phone: yup.string().required('Vui lòng nhập số điện thoại người dùng'),
    question: yup.string().required('Vui lòng nhập câu hỏi'),
    answer: yup.string().required('Vui lòng nhập câu trả lời'),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: userInfo.name || '',
      email: userInfo.email || '',
      phone: userInfo.phone || '',
      question: userInfo.question || '',
      answer: userInfo.answer || '',
    },
  });

  // Call api lấy thông tin câu hỏi
  useEffect(() => {
    (async () => {
      try {
        //Call api lấy thông tin câu hỏi ở đây qua Id của câu hỏi.....
      } catch (error) {
        throw new Error(error);
      }
    })();
  }, [replyingQuestion]);

  // Call api lấy câu hỏi
  useEffect(() => {
    (async () => {
      try {
        //Call api lấy danh sách câu hỏi ở đây
      } catch (error) {
        throw new Error(error);
      }
    })();
  }, []);

  const handleReplyingQuestionChange = (id) => {
    setReplyingQuestion(id);
  };

  const handleSubmitForm = (data) => {
    // Check điều kiện rồi gọi api
    console.log(data);
  };

  return (
    <main className="px-10 py-5">
      <h1 className="mb-5 text-2xl font-medium uppercase">
        Phản hồi khách hàng
      </h1>
      <section className="flex gap-5">
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="-mx-2 flex max-w-[75%] basis-3/4 flex-wrap"
        >
          <div className="max-w-[33.3333%] basis-1/3">
            <div className="px-2">
              <InputField
                label="Tên khách hàng"
                placeholder="Nhập tên khách hàng"
                register={{ ...register('name') }}
                errorMessage={errors.name?.message}
                readOnly={true}
              />
            </div>
          </div>
          <div className="max-w-[33.3333%] basis-1/3">
            <div className="px-2">
              <InputField
                label="Email khách hàng"
                placeholder="Nhập email khách hàng"
                register={{ ...register('email') }}
                errorMessage={errors.email?.message}
                readOnly={true}
              />
            </div>
          </div>
          <div className="max-w-[33.3333%] basis-1/3">
            <div className="px-2">
              <InputField
                label="Số điện thoại khách hàng"
                placeholder="Nhập số điện thoại khách hàng"
                register={{ ...register('phone') }}
                errorMessage={errors.phone?.message}
                readOnly={true}
              />
            </div>
          </div>
          <div className="mt-5 max-w-full basis-full">
            <div className="px-2">
              <TextAreaField
                label="Câu hỏi của khách hàng"
                placeholder="Nhập câu hỏi của khách hàng"
                register={{ ...register('question') }}
                errorMessage={errors.question?.message}
                readOnly={true}
              />
            </div>
          </div>
          <div className="mt-5 max-w-full basis-full">
            <div className="px-2">
              <TextAreaField
                label="Câu trả lời của Admin"
                placeholder="Nhập câu trả lời"
                register={{ ...register('answer') }}
                errorMessage={errors.answer?.message}
                rows={10}
              />
            </div>
          </div>
          <div className="my-5 flex px-2">
            <button className="rounded bg-blue-500 px-5 py-2 text-sm text-white transition-colors hover:bg-blue-400">
              Gửi câu trả lời
            </button>
          </div>
        </form>
        <div className="max-w-[25%] basis-1/4">
          <div className="h-[95%] overflow-hidden rounded border border-solid py-2 text-sm font-medium uppercase">
            <h2 className="border-b border-solid pb-2 text-center">
              Danh sách câu hỏi từ khách hàng
            </h2>
            <ul className="px-4 py-2">
              {/* Hiển thị danh sách câu hỏi ở đây */}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default QuestionAndAnswer;

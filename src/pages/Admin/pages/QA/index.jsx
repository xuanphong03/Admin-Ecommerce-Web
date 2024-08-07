import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import StorageKeys from '~/constants/storage-key';
import PropTypes from 'prop-types';
import InputField from '~/components/form-controls/InputField';
import TextAreaField from '~/components/form-controls/TextAreaField';
import { useEffect, useState } from 'react';

QuestionAndAnswer.propTypes = {};

function QuestionAndAnswer(props) {
  // ------------------------------------------------------------------------------------------
  const token = localStorage.getItem(StorageKeys.TOKEN) || '';
  const [newOptions, setNewOptions] = useState([]);
  const [inputFilter2, setInputFilter2] = useState('');
  const [filteredOptions2, setFilteredOptions2] = useState([]);

  const normalizeString = (str) => {
    if (typeof str === 'string') {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    console.error('Expected a string, but got:', typeof str);
    return '';
  };

  const handleInputChange2 = (e) => {
    setInputFilter2(e.target.value);
  };

  const fetchOptions2 = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/v1/rest/getAllQuestionsOfGuestInfor',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      console.log(data);

      setNewOptions(data);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  useEffect(() => {
    const normalizedFilter2 = normalizeString(inputFilter2);
    setFilteredOptions2(
      newOptions.filter(
        (option) =>
          normalizeString(option.name)
            .toLowerCase()
            .includes(normalizedFilter2.toLowerCase()) ||
          normalizeString(option.email)
            .toLowerCase()
            .includes(normalizedFilter2.toLowerCase()) ||
          normalizeString(option.phone)
            .toLowerCase()
            .includes(normalizedFilter2.toLowerCase()) ||
          normalizeString(option.question)
            .toLowerCase()
            .includes(normalizedFilter2.toLowerCase()),
      ),
    );
  }, [inputFilter2, newOptions]);
  // ----------------------------------------------------------------------
  const createQuestionAnswerOfGuest = async (questionAnswer, token) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/rest/qa-answer-guest`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(questionAnswer),
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating question answer of guest:', error);
      throw error;
    }
  };
  // ----------------------------------------------------------------------
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    question: '',
    answer: '',
  });

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
    formState: { errors },
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

  useEffect(() => {
    (async () => {
      try {
        fetchOptions2();
      } catch (error) {
        console.error('Failed to fetch questions', error);
      }
    })();
  }, []);

  const handleOptionClick2 = (option) => {
    const newUserInfo = {
      name: option.name,
      email: option.email,
      phone: option.phone,
      question: option.question,
      answer: '',
    };
    setUserInfo(newUserInfo);
    reset(newUserInfo);
    setInputFilter2('');
  };

  const handleSubmitForm = async (data) => {
    try {
      const questionAnswer = {
        question: data.question,
        answer: data.answer,
      };
      const response = await createQuestionAnswerOfGuest(questionAnswer, token);
      console.log('Response:', response);
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  return (
    <main className="items-center px-20 py-20">
      <h1 className="bold mb-5 text-2xl font-medium uppercase italic">
        Phản hồi khách hàng
      </h1>
      <section className="flex gap-5">
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="-mx-2 flex max-w-[65%] basis-3/4 flex-wrap"
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
          <div className="mt-4 max-w-full basis-full">
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
        <div className="max-w-[35%] basis-3/4">
          <div className="h-[86%] overflow-hidden rounded border border-solid py-2 text-sm font-medium">
            <h2 className="bold border-b border-solid pb-2 text-center italic">
              Danh sách câu hỏi từ khách hàng
            </h2>
            <ul className="px-4 py-2">
              <div
                className="overflow-auto rounded border border-gray-300 bg-white shadow-lg"
                style={{
                  top: '100%',
                  left: '0',
                  maxHeight: '502px',
                }}
              >
                <input
                  type="text"
                  value={inputFilter2}
                  onChange={handleInputChange2}
                  className="w-full border-b border-gray-300 px-2 py-1 text-sm"
                  placeholder="Tìm kiếm..."
                />
                <ul>
                  {filteredOptions2.map((option, index) => (
                    <li
                      key={index}
                      className="flex cursor-pointer items-center gap-4 px-4 py-2 hover:bg-gray-300"
                      onClick={() => handleOptionClick2(option)}
                    >
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
                        <img
                          src={option.user_img_url}
                          className="h-full w-full object-cover"
                          alt={`Option ${index}`}
                        />
                      </div>
                      <div className="ml-4 flex flex-col">
                        <p className="text-xs">Name: {option.name}</p>
                        <p className="font-family: Serif text-xs">
                          Email: {option.email}
                        </p>
                        <p className="Serif text-xs">Phone : {option.phone}</p>
                        <p className="Serif text-sm text-orange-700">
                          Question: {option.question}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default QuestionAndAnswer;

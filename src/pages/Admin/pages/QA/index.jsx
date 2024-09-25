import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import questionAnswerAdmin from '~/apis/questionAnswerAdmin';
import InputField from '~/components/form-controls/InputField';
import TextAreaField from '~/components/form-controls/TextAreaField';
import { getFirstCharacterOfName } from '~/utils';

function QuestionAndAnswer() {
  const schema = yup.object().shape({
    name: yup.string().required(''),
    email: yup.string().required(''),
    phone: yup.string().required(''),
    question: yup.string().required(''),
    answer: yup.string().required('Vui lòng nhập câu trả lời'),
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [customerQuestions, setCustomerQuestions] = useState([]);
  const [isAnsweringQuestion, setIsAnsweringQuestion] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getCustomerQuestions = async () => {
    try {
      const response = await questionAnswerAdmin.getAll();
      setSearchResult(response);
      setCustomerQuestions(response);
    } catch (error) {
      throw new Error('Failed to get question list');
    }
  };

  const normalizeString = (str) => {
    return str.trim().toLowerCase();
  };

  const handleSearchTermChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    const newSearchResult = customerQuestions.filter(
      ({ name, email, phone }) =>
        normalizeString(name).includes(normalizeString(searchValue)) ||
        normalizeString(email).includes(normalizeString(searchValue)) ||
        normalizeString(phone).includes(normalizeString(searchValue)),
    );
    setSearchResult(newSearchResult);
  };

  useEffect(() => {
    getCustomerQuestions();
  }, []);

  const handleAnswerCustomer = (option) => {
    setIsAnsweringQuestion(true);
    const { name, email, phone, question, answer } = option;
    setValue('name', name);
    setValue('email', email);
    setValue('phone', phone);
    setValue('question', question);
    setValue('answer', answer);
    setSearchTerm('');
  };

  const handleSubmitForm = async (data) => {
    try {
      await questionAnswerAdmin.answerQuestion({
        question: data.question,
        answer: data.answer,
      });
      toast.success('Câu trả lời đã được gửi đi');
      reset();
      getCustomerQuestions();
    } catch (error) {
      toast.error('Opps...Câu trả lời chưa thể gửi đi');
      throw new Error('Failed to post answer');
    } finally {
      setIsAnsweringQuestion(false);
    }
  };

  return (
    <main className="items-center">
      <h1 className="text-sm text-gray-950">Hỗ trợ khách hàng</h1>
      <hr className="my-5"></hr>
      <section className="flex gap-5">
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="relative flex max-w-[75%] basis-3/4 flex-wrap rounded border border-solid border-gray-200 p-2"
        >
          <div className="max-w-[33.3333%] basis-1/3">
            <div className="px-2">
              <InputField
                label="Tên khách hàng"
                placeholder="Tên khách hàng"
                register={{ ...register('name') }}
                readOnly={true}
              />
            </div>
          </div>
          <div className="max-w-[33.3333%] basis-1/3">
            <div className="px-2">
              <InputField
                label="Email khách hàng"
                placeholder="Email khách hàng"
                register={{ ...register('email') }}
                readOnly={true}
              />
            </div>
          </div>
          <div className="max-w-[33.3333%] basis-1/3">
            <div className="px-2">
              <InputField
                label="Số điện thoại khách hàng"
                placeholder="Số điện thoại khách hàng"
                register={{ ...register('phone') }}
                readOnly={true}
              />
            </div>
          </div>
          <div className="mt-5 max-w-full basis-full">
            <div className="px-2">
              <TextAreaField
                label="Câu hỏi của khách hàng"
                placeholder="Câu hỏi của khách hàng"
                register={{ ...register('question') }}
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
          <div className="absolute -bottom-12 left-0 flex px-2">
            <button
              className={`rounded px-5 py-2 text-sm text-white transition-colors ${isSubmitting ? 'cursor-not-allowed bg-blue-400' : 'cursor-pointer bg-blue-500 hover:bg-blue-400'} ${isAnsweringQuestion ? '' : 'pointer-events-none bg-blue-200'}`}
            >
              {isSubmitting ? 'Đang gửi yêu cầu...' : 'Gửi câu trả lời'}
            </button>
          </div>
        </form>
        <div className="max-w-[35%] basis-3/4">
          <div className="h-[100%] overflow-hidden rounded border border-solid py-2 text-sm">
            <h2 className="border-b border-solid pb-2 text-center text-sm text-gray-950">
              Danh sách câu hỏi từ khách hàng
            </h2>
            <ul className="px-4 py-2">
              <div className="bg-white">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                  className="w-full rounded-sm border border-solid border-gray-300 px-3 py-2 text-sm outline-none"
                  placeholder="Tìm kiếm..."
                />
                <ul className="mt-2 h-[400px]">
                  {searchResult.length > 0 ? (
                    searchResult.map((option) => {
                      const firstCharacterOfName = getFirstCharacterOfName(
                        option.name,
                      );
                      return (
                        <li
                          key={uuidv4()}
                          className="flex cursor-pointer items-center gap-2 border-b border-solid border-gray-300 px-4 py-2 hover:bg-gray-300"
                          onClick={() => handleAnswerCustomer(option)}
                        >
                          <div className="flex size-14 items-center justify-center rounded-full bg-red-500 text-2xl font-bold text-white">
                            {firstCharacterOfName.toUpperCase()}
                          </div>
                          <div className="ml-4 flex flex-col font-normal">
                            <p className="">Họ và tên: {option.name}</p>
                            <p className="">Email: {option.email}</p>
                            <p className="">Số điện thoại : {option.phone}</p>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <li className="px-4 py-5 text-center">
                      Không có bất kỳ câu hỏi nào
                    </li>
                  )}
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

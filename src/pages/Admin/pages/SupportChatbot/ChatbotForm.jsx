import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import TextAreaField from '~/components/form-controls/TextAreaField';

ChatbotForm.propTypes = {
  onSubmit: PropTypes.func,
  onToggle: PropTypes.func,
};

function ChatbotForm({ onToggle, onSubmit }) {
  const schema = yup.object().shape({
    question: yup.string().required('Vui lòng nhập câu hỏi'),
    answer: yup.string().required('Vui lòng nhập câu trả lời'),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toggleForm = () => {
    if (onToggle) {
      onToggle();
    }
  };

  const handleSubmitForm = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
      onToggle();
    }
  };

  return (
    <div className="w-140 rounded-md bg-white px-10 py-5">
      <h2 className="font-medium">Thêm dữ liệu cho Chatbot</h2>
      <hr className="mb-5 mt-2"></hr>
      <form className="space-y-5" onSubmit={handleSubmit(handleSubmitForm)}>
        <div>
          <TextAreaField
            id="question"
            label="Câu hỏi mới"
            placeholder="Nhập câu hỏi mới..."
            register={{ ...register('question') }}
            errorMessage={errors.question?.message}
            rows={5}
          />
        </div>
        <div>
          <TextAreaField
            id="question"
            label="Câu trả lời"
            placeholder="Nhập câu trả lời..."
            register={{ ...register('answer') }}
            errorMessage={errors.answer?.message}
            rows={5}
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={toggleForm}
            className="rounded bg-red-500 px-5 py-2 text-sm text-white hover:bg-opacity-80"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="rounded bg-green-500 px-5 py-2 text-sm text-white hover:bg-opacity-80"
          >
            Thêm mới
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatbotForm;

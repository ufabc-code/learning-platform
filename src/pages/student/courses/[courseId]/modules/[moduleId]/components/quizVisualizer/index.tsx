import StudentQuizAnswer from 'components/student/quizAnswerModal';
import { useState } from 'react';
import QuizLesson from 'server/entities/quizLesson';

interface QuizVisualizerProps {
  quizLesson: QuizLesson
}

var selectedUser = [];
var sucessAnswer = 0;

export function QuizVisualizer({ quizLesson }: QuizVisualizerProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  function setOptionQuestions(index: number[]){
    selectedUser.push(index);
  }

  function validateAnswer(answerUser: number[]){
    var countAnswer = quizLesson.solution.correct.length;
    var countSelected = answerUser.length;
    
    if(countAnswer == countSelected){
      console.log(quizLesson.solution.correct);
      console.log(answerUser);

      for(let a = 0; a < answerUser.length; a++){
        if(quizLesson.solution.correct.includes(answerUser[a])){
          sucessAnswer++;
        }
      }

      if(sucessAnswer == quizLesson.solution.correct.length){
        console.log("acertou :)")
      }
      else{
        console.log("errou :/")
      }
    }
    else{
      console.log("errou :/")
    }
    sucessAnswer = 0;
    answerUser.length = 0;
  }


  return (
    <div className="m-2 py-2">
      <h1 className="py-2 text-2xl font-bold">Quiz Visualizer</h1>
      <div>
        <div className="border-y-2">
          <h1 className="pt-4 pb-1 font-semibold">
            {quizLesson.text}
          </h1>
        </div>
        <div>
          <h2 className="py-2">Selecione a(s) alternativas correta(s):</h2>
          <div className="w-max rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
            {quizLesson.alternatives.map((alternative, index) => (
              <div key={index}>
                <button
                  type="button"
                  onClick={() => setOptionQuestions(index)}
                  className="w-full cursor-pointer border-b border-gray-200 py-2 px-4 text-left font-medium hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-gray-500"
                >
                  {alternative.text}
                </button>
              </div>
            ))}
          </div>

          <br />
        </div>

        <button
          type="button"
          onClick={() => validateAnswer(selectedUser)}
          className="mr-2 mb-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Verificar
        </button>
        
        <button onClick={() => setIsModalVisible(true)} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle="popup-modal">
          Visualizar Resposta
        </button>
        {isModalVisible && <StudentQuizAnswer onClose={() => setIsModalVisible(false)} content={quizLesson.solution.text}/>}
      </div>
    </div>
  )
}

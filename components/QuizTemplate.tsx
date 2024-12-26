import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

interface QuizWord {
  id: string;
  word: string;
  level: number;
}

interface QuizTemplateProps {
  words: QuizWord[];
  date?: Date;
}

const QuizTemplate = ({ words, date = new Date() }: QuizTemplateProps) => {
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="mb-8 space-y-2">
        <h2 className="text-xl font-bold text-gray-900">
          {formattedDate}의 JLPT 단어 퀴즈
        </h2>
        <p className="text-sm text-gray-600">
          오늘은 {words.length}개의 단어가 준비되어 있습니다. 각 단어의
          &apos;정답 확인하기&apos; 버튼을 클릭하면 해당 단어의 상세 페이지로
          이동합니다.
        </p>
      </div>

      <div className="space-y-4">
        {words.map((word, index) => (
          <Card key={word.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-medium text-gray-500">
                    {`#${index + 1}`}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {word.word}
                  </h3>
                </div>
                <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                  {`N${word.level}`}
                </span>
              </div>

              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() =>
                    window.open(`/words/${word.level}/${word.id}`, "_blank")
                  }
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  정답 확인하기
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
        매일 아침 9시에 새로운 퀴즈가 제공됩니다. 구독 설정은 언제든지 변경하실
        수 있습니다.
      </div>
    </div>
  );
};

export default QuizTemplate;

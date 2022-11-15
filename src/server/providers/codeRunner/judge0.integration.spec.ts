import { CodeRunnerStatus } from './iCodeRunner'
import Judge0 from './judge0'

describe('Judge0 [python]', () => {
  it("Should return 'OK' when the code is valid", async () => {
    const codeRunner = new Judge0()
    const result = await codeRunner.runCode({
      code: 'print(int(input()) + int(input()))',
      language: 'python',
      input: '1\n2',
    })
    expect(result.status).toBe(CodeRunnerStatus.OK)
    expect(result.output).toBe('3\n')
  }, 10000)

  it("Should return 'ERROR' when the code is invalid", async () => {
    const codeRunner = new Judge0()
    const result = await codeRunner.runCode({
      code: 'print(int(input()) + int(input())',
      language: 'python',
      input: '1\n2',
    })
    expect(result.status).toBe(CodeRunnerStatus.ERROR)
    expect(!!result.stderr).toBe(true)
  }, 20000)

  it("Should return 'TIMEOUT' when the code takes too long to run", async () => {
    const codeRunner = new Judge0()
    const result = await codeRunner.runCode({
      code: 'while True: pass',
      language: 'python',
      input: '',
    })
    expect(result.status).toBe(CodeRunnerStatus.TIMEOUT)
  }, 20000)
})

describe('Judge0 [c++]', () => {
  it("Should return 'OK' when the code is valid", async () => {
    const codeRunner = new Judge0()
    const result = await codeRunner.runCode({
      code: `
        #include <iostream>
        using namespace std;

        int main() {
          int a, b;
          cin >> a >> b;
          cout << a + b << endl;
          return 0;
        }`,
      language: 'c++',
      input: '1\n2',
    })
    expect(result.status).toBe(CodeRunnerStatus.OK)
    expect(result.output).toBe('3\n')
  }, 10000)

  it("Should return 'ERROR' when the code is invalid", async () => {
    const codeRunner = new Judge0()
    const result = await codeRunner.runCode({
      code: `
        #include <iostream>
        using namespace std;

        int main() {
          int a, b;
          cin >> a >> b;
          cout << a + b << endl;
          return 0;
        `,
      language: 'c++',
      input: '1\n2',
    })
    expect(result.status).toBe(CodeRunnerStatus.ERROR)
    expect(!!result.stderr).toBe(true)
  }, 20000)

  it("Should return 'TIMEOUT' when the code takes too long to run", async () => {
    const codeRunner = new Judge0()
    const result = await codeRunner.runCode({
      code: `
        #include <iostream>
        using namespace std;

        int main() {
          while (true) {}
          return 0;
        }`,
      language: 'c++',
      input: '',
    })

    expect(result.status).toBe(CodeRunnerStatus.TIMEOUT)
  }, 20000)
})

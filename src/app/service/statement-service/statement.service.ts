import { Injectable } from '@angular/core';
import { StatementEditDTO } from 'src/app/dto/statement/StatementEditDTO';
import { StatementPreviewDTO } from 'src/app/dto/statement/StatementPreviewDTO';
import { constant } from 'src/app/util/GlobalVariables';
import { StatementPreviewViewModel } from 'src/app/viewModel/statement/StatementPreviewViewModel';
import { TeacherMicroViewModel } from 'src/app/viewModel/teacher/TeacherMicroViewModel';

@Injectable({
  providedIn: 'root'
})
export class StatementService 
{

  constructor() { }
  
  public async getEdit(
    statementId: Number,
    jwt: string,
    setIsLoading: (value: boolean) => void,
    setIsError: (value: boolean) => void,
    setStatementEditViewModel: (statementEditDTO: StatementEditDTO) => void,
    setTeacherMicroViewModels: (teacherMicroViewModels: Array<TeacherMicroViewModel>) => void
  ): Promise<void>
  {
    setIsLoading(true);
    setIsError(false);
    try
    {
      await fetch(constant.baseDomain + "/api/admin/statement/" + statementId, 
          {
              method : "GET",
              headers: {
                  'Authorization': 'Bearer '+ jwt, 
                  'Content-Type': 'application/json'
              }
          }
      )
      .then(res => res.json())
      .then((jsonAnswerStatus) => {
          if(jsonAnswerStatus.status === "success"  && ...)
          {
            setStatementEditViewModel(jsonAnswerStatus.statementEditViewModel);
            setTeacherMicroViewModels(jsonAnswerStatus.teacherMicroViewModels);
          } else 
          {
            setIsError(true);
          }
          },
        (error) => {
          console.log(error);
          setIsError(true);
        }
      )

    } catch(error)
    {
      console.log(error);
      setIsError(true);
    } finally
    {
      setIsLoading(false);
    }
  }

  public async update(
    id: number,
    teacher_id: number,
    jwt: string, 
    setIsLoading: (value: boolean) => void,
    setWarning: (value: string) => void,
    callbackSuccessful: () => void,
  ): Promise<void>
  {
    setIsLoading(true);
    setWarning("");
    try
    {
      const data: any = {
        "id": id,
        ...
      }

      await fetch(constant.baseDomain + "/api/admin/statement", 
          {
              method : "PUT",
              headers: {
                'Authorization': 'Bearer '+ jwt
              },
              body: JSON.stringify(data)
          }
      )
      .then(res => res.json())
      .then((jsonAnswerStatus) => {
          if(...)
          {
            callbackSuccessful();
          } else 
          {
            setWarning("Неизвестная ошибка на сервере");
          }
        },
        (error) => {
            console.log(error);
            setWarning("Ошибка на стороне сервера");
        }
      )

    } catch(error)
    {
      console.log(error);
      setWarning("Неизвестная ошибка на сервере");
    } finally
    {
      setIsLoading(false);
    }
  }
  
  public async search(
    date_from: string | null,
    date_to: string | null,
    jwt: string,
    setIsLoading: (value: boolean) => void,
    setIsError: (value: boolean) => void,
    setStatementPreviewViewModels: (statementPreviewViewModels: Array<StatementPreviewDTO>) => void
  ): Promise<void>
  {
    setIsLoading(true);
    setIsError(false);
    try
    {
      const data: any = {
        "date_from" : date_from,
        ...
      }

      await fetch(constant.baseDomain + "/api/admin/statement/search", 
          {
              method : "POST",
              headers: {
                  'Authorization': 'Bearer '+ jwt, 
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          }
      )
      .then(res => res.json())
      .then((jsonAnswerStatus) => {
          console.log(jsonAnswerStatus);
          if(jsonAnswerStatus.status === "success" && ...)
          {
            setStatementPreviewViewModels(jsonAnswerStatus.statementPreviewViewModels);
          } else 
          {
            setIsError(true);
          }
          },
        (error) => {
          console.log(error);
          setIsError(true);
        }
      )

    } catch(error)
    {
      console.log(error);
      setIsError(true);
    } finally
    {
      setIsLoading(false);
    }
  }
}

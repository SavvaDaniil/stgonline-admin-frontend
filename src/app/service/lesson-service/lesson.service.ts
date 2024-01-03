import { Injectable } from '@angular/core';
import { LessonEditDTO } from 'src/app/dto/lesson/LessonEditDTO';
import { constant } from 'src/app/util/GlobalVariables';
import { LessonMicroViewModel } from 'src/app/viewModel/lesson/LessonMicroViewModel';
import { LessonTypeMicroViewModel } from 'src/app/viewModel/lesson_type/LessonTypeMicroViewModel';

@Injectable({
  providedIn: 'root'
})
export class LessonService 
{

  constructor() { }

  public async posterDelete(
    lessonId: Number,
    jwt: string, 
    setIsLoading: (value: boolean) => void,
    setWarning: (value: string) => void,
    successfullCallback: () => void
  ): Promise<void>
  {
    setIsLoading(true);
    setWarning("");

    try
    {

      await fetch(constant.baseDomain + "/api/admin/lesson/poster/" + lessonId, 
          {
              method : "DELETE",
              headers: {
                'Authorization': 'Bearer '+ jwt, 
                'Content-Type': 'application/json'
              }
          }
      )
      .then(res => res.json())
      .then((jsonAnswerStatus) => {
          if(...)
          {
            setIsLoading(false);
            successfullCallback();
          } else if(jsonAnswerStatus.status === "error")
          {
            setWarning(jsonAnswerStatus.errors);
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


  public async update(
    id: Number,
    meta_keywords: string | null,
    meta_description: string | null,
    name: string | null,
    
    ...

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
      const formData: FormData = new FormData();

      formData.append("id", id.toString());
      if(meta_keywords !== null)
      {
        formData.append("meta_keywords", meta_keywords!);
      }
      
      ...
      
      formData.append("active", active.toString());
      formData.append("is_visible", is_visible.toString());
      formData.append("days", days.toString());
      
      ...

      await fetch(constant.baseDomain + "/api/admin/lesson/" + id, 
          {
              method : "POST",
              headers: {
                'Authorization': 'Bearer '+ jwt
              },
              body: formData
          }
      )
      .then(res => res.json())
      .then((jsonAnswerStatus) => {
          if(...)
          {
            callbackSuccessful();
          } else if(jsonAnswerStatus.status === "error")
          {
            setWarning(jsonAnswerStatus.errors);
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
  
  public async getEdit(
    teacherId: Number,
    jwt: string,
    setIsLoading: (value: boolean) => void,
    setIsError: (value: boolean) => void,
    setLessonEditViewModel: (lessonEditDTOViewModel: LessonEditDTO) => void
  ): Promise<void>
  {
    setIsLoading(true);
    try
    {
      await fetch(constant.baseDomain + "/api/admin/lesson/" + teacherId, 
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
          console.log(jsonAnswerStatus);
          if(jsonAnswerStatus.status === "success" && ...)
          {
            setLessonEditViewModel(jsonAnswerStatus.lessonEditViewModel);
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
  
  public async listMicros(
    jwt: string,
    setIsLoading: (value: boolean) => void,
    setIsError: (value: boolean) => void,
    setLessonMicroViewModels: (lessonMicroViewModels: Array<LessonMicroViewModel>) => void
  ): Promise<void>
  {
    setIsLoading(true);
    try
    {
      await fetch(constant.baseDomain + "/api/admin/lesson/list_micros", 
          {
              method : "POST",
              headers: {
                  'Authorization': 'Bearer '+ jwt, 
                  'Content-Type': 'application/json'
              }
          }
      )
      .then(res => res.json())
      .then((jsonAnswerStatus) => {
          console.log(jsonAnswerStatus);
          if(jsonAnswerStatus.status === "success" && ...)
          {
            setLessonMicroViewModels(jsonAnswerStatus.lessonMicroViewModels);
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

import { Injectable } from '@angular/core';
import { TeacherEditDTO } from 'src/app/dto/teacher/TeacherEditDTO';
import { TeacherPreviewDTO } from 'src/app/dto/teacher/TeacherPreviewDTO';
import { constant } from 'src/app/util/GlobalVariables';

@Injectable({
  providedIn: 'root'
})
export class TeacherService 
{

  constructor() 
  {

  }

  public async posterDelete(
    teacher_id: Number,
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

      await fetch(constant.baseDomain + "/api/admin/teacher/poster/" + teacher_id, 
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

  public async add(
    name: string,
    jwt: string, 
    setIsLoading: (value: boolean) => void,
    setWarning: (value: string) => void,
    addTeacherCallback: () => void
  ): Promise<void>
  {
    setIsLoading(true);
    setWarning("");

    const data = {
      "name" : name
    }

    try
    {

      await fetch(constant.baseDomain + "/api/admin/teacher/add", 
          {
              method : "PUT",
              headers: {
                'Authorization': 'Bearer '+ jwt, 
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          }
      )
      .then(res => res.json())
      .then((jsonAnswerStatus) => {
          if(...)
          {
            setIsLoading(false);
            addTeacherCallback();
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
    id: number,
    name: string | null,
    poster_file: File | null,

    ...

    jwt: string, 
    setIsLoading: (value: boolean) => void,
    setWarning: (value: string) => void,
    setSuccess: (value: string) => void,
  ): Promise<void>
  {
    setIsLoading(true);
    setWarning("");
    setSuccess("");
    try
    {
      const formData: FormData = new FormData();
      formData.append("id", id.toString());
      if(poster_file !== null)
      {
        formData.append("poster_file", poster_file);
      }
      if(name !== null)
      {
      formData.append("name", name!);
      }
      
      ...
      formData.append("is_active", is_active.toString());
      formData.append("is_curator", is_curator.toString());
      ...

      await fetch(constant.baseDomain + "/api/admin/teacher/" + id, 
          {
              method : "POST",
              headers: {
                'Authorization': 'Bearer '+ jwt, 
                //"Content-Type" : "multipart/form-data"
              },
              body: formData
          }
      )
      .then(res => res.json())
      .then((jsonAnswerStatus) => {
          if(...)
          {
            setSuccess("Успешно сохранено");
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
    setTeacherEditViewModel: (teacherEditViewModel: TeacherEditDTO) => void
  ): Promise<void>
  {
    setIsLoading(true);
    try
    {
      await fetch(constant.baseDomain + "/api/admin/teacher/" + teacherId, 
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
            setTeacherEditViewModel(jsonAnswerStatus.teacherEditViewModel);
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
  
  public async listPreviews(
    jwt: string,
    setIsLoading: (value: boolean) => void,
    setIsError: (value: boolean) => void,
    setTeacherPreviewViewModels: (teacherPreviewViewModels: Array<TeacherPreviewDTO>) => void
  ): Promise<void>
  {
    setIsLoading(true);
    setIsError(false);
    try
    {
      await fetch(constant.baseDomain + "/api/admin/teacher/list_previews", 
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
            setTeacherPreviewViewModels(jsonAnswerStatus.teacherPreviewViewModels);
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

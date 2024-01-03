import { Injectable } from '@angular/core';
import { CourseEditDTO } from 'src/app/dto/course/CourseEditDTO';
import { constant } from 'src/app/util/GlobalVariables';
import { CourseDayInfoViewModel } from 'src/app/viewModel/course/CourseDayInfoViewModel';
import { CourseMicroViewModel } from 'src/app/viewModel/course/CourseMicroViewModel';
import { LessonMicroViewModel } from 'src/app/viewModel/lesson/LessonMicroViewModel';

@Injectable({
  providedIn: 'root'
})
export class CourseService 
{
  constructor() { }

  public async courseLessonUpdate(
    id: number,
    lesson_id: number,
    homework_status: number,
    homework_text: string | null,
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
        "lesson_id" : lesson_id,
        ...
      }

      await fetch(constant.baseDomain + "/api/admin/course/course_lesson", 
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

  public async courseLessonAdd(
    course_id: number,
    course_day_id: number,
    jwt: string, 
    setIsLoading: (value: boolean) => void,
    setIsError: (value: boolean) => void,
    callbackSuccessful: () => void,
  ): Promise<void>
  {
    setIsLoading(true);
    setIsError(false);
    try
    {
      const data: any = {
        "course_id": course_id,
        ...
      }

      await fetch(constant.baseDomain + "/api/admin/course/course_lesson/add", 
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

  public async courseLessonDelete(
    course_lesson_id: number,
    jwt: string, 
    setIsLoading: (value: boolean) => void,
    callbackSuccessful: () => void,
  ): Promise<void>
  {
    setIsLoading(true);
    try
    {
      await fetch(constant.baseDomain + "/api/admin/course/course_lesson/" + course_lesson_id, 
          {
              method : "DELETE",
              headers: {
                'Authorization': 'Bearer '+ jwt
              }
          }
      )
      .then(res => res.json())
      .then((jsonAnswerStatus) => {
          if(...)
          {
            callbackSuccessful();
          } else 
          {
            alert("Незвестная ошибка на сервере");
          }
        },
        (error) => {
            console.log(error);
            alert("Незвестная ошибка на сервере");
        }
      )

    } catch(error)
    {
      console.log(error);
      alert("Незвестная ошибка на сервере");
    } finally
    {
      setIsLoading(false);
    }
  }

  public async courseDayAdd(
    course_id: number,
    jwt: string, 
    setIsLoading: (value: boolean) => void,
    setIsError: (value: boolean) => void,
    callbackSuccessful: () => void,
  ): Promise<void>
  {
    setIsLoading(true);
    setIsError(false);
    try
    {
      const data: any = {
        "course_id": course_id,
        ...
      }

      await fetch(constant.baseDomain + "/api/admin/course/course_day/add", 
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

  public async courseDayUpdate(
    id: number,
    name: string | null,
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
        "name" : name,
        ...
      }

      await fetch(constant.baseDomain + "/api/admin/course/course_day", 
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

  public async courseDayDelete(
    course_day_id: number,
    jwt: string, 
    setIsLoading: (value: boolean) => void,
    callbackSuccessful: () => void,
  ): Promise<void>
  {
    setIsLoading(true);
    try
    {
      await fetch(constant.baseDomain + "/api/admin/course/course_day/" + course_day_id, 
          {
              method : "DELETE",
              headers: {
                'Authorization': 'Bearer '+ jwt
              }
          }
      )
      .then(res => res.json())
      .then((jsonAnswerStatus) => {
          if(...)
          {
            callbackSuccessful();
          } else 
          {
            alert("Незвестная ошибка на сервере");
          }
        },
        (error) => {
            console.log(error);
            alert("error");
        }
      )

    } catch(error)
    {
      console.log(error);
      alert("error");
    } finally
    {
      setIsLoading(false);
    }
  }
  
  public async listCourseDays(
    courseId: number,
    jwt: string,
    setIsLoading: (value: boolean) => void,
    setIsError: (value: boolean) => void,
    setCourseDayInfoViewModels: (courseDayInfoViewModels: Array<CourseDayInfoViewModel>) => void,
    setLessonMicroViewModels: (lessonMicroViewModels: Array<LessonMicroViewModel>) => void
  ): Promise<void>
  {
    setIsLoading(true);
    setIsError(false);
    try
    {
      await fetch(constant.baseDomain + "/api/admin/course/course_day_list/" + courseId, 
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
          if(jsonAnswerStatus.status === "success" 
          && ...
          ){
            setCourseDayInfoViewModels(jsonAnswerStatus.courseDayInfoViewModels);
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

  public async posterDelete(
    courseId: Number,
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

      await fetch(constant.baseDomain + "/api/admin/course/poster/" + courseId, 
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

    order_in_list: number,
    posterFile: File | null,

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
      const formData: FormData = new FormData();

      formData.append("id", id.toString());
      if(meta_keywords !== null)
      {
        formData.append("meta_keywords", meta_keywords!);
      }
      
      ...

      formData.append("days", days.toString());
      formData.append("price", price.toString());
      formData.append("price_fake", price_fake.toString());
      formData.append("price_with_chat", price_with_chat.toString());
      formData.append("price_with_chat_fake", price_with_chat_fake.toString());
      
      ...

      if(posterFile !== null)
      {
        formData.append("poster_file", posterFile);
      }
      formData.append("teacher_id", teacher_id.toString());
      

      await fetch(constant.baseDomain + "/api/admin/course/" + id, 
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
    courseId: Number,
    jwt: string,
    setIsLoading: (value: boolean) => void,
    setIsError: (value: boolean) => void,
    setCourseEditViewModel: (courseEditDTOViewModel: CourseEditDTO) => void
  ): Promise<void>
  {
    setIsLoading(true);
    try
    {
      await fetch(constant.baseDomain + "/api/admin/course/" + courseId, 
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
            setCourseEditViewModel(jsonAnswerStatus.courseEditViewModel);
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
    setCourseMicroViewModels: (courseMicroViewModels: Array<CourseMicroViewModel>) => void
  ): Promise<void>
  {
    setIsLoading(true);
    setIsError(false);
    try
    {
      await fetch(constant.baseDomain + "/api/admin/course/list_micros", 
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
            setCourseMicroViewModels(jsonAnswerStatus.courseMicroViewModels);
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

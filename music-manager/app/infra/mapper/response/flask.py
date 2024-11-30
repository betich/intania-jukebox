from typing import Dict, Tuple, Optional, List, Any
from flask import jsonify, Response

type JSONResponse = Tuple[Response, int]
ERROR_INFO = {
  "400": "Bad Request",
  "401": "Unauthorized",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "500": "Internal Server Error"
}

class FlaskResponseMapper():
  @staticmethod
  def success(data: Dict | List[Any] | None, message: Optional[str]) -> JSONResponse:
    if message:
      return jsonify({ "message": message, "content": data }), 200
    else:
      return jsonify({ "message": "Success", "content": data }), 200

  @staticmethod
  def success_message(message: str) -> JSONResponse:
    return jsonify({ "message": message }), 200
  
  @staticmethod
  def error_message(code: str) -> JSONResponse:
    return jsonify({ "message": ERROR_INFO[code] }), int(code)
  
  @staticmethod
  def internal_error_message(content: str) -> JSONResponse:
    return jsonify({ "message": ERROR_INFO["500"], "content": content }), 500
  
  @staticmethod
  def not_found() -> JSONResponse:
    return FlaskResponseMapper.error_message("404")
  
  @staticmethod
  def bad_request(message: str) -> JSONResponse:
    return jsonify({ "message": message }), 400
  
  @staticmethod
  def resource_not_found(message: Optional[str]) -> JSONResponse:
    if message:
      return jsonify({ "message": {message}, "content": [] }), 200
    else:
      return jsonify({ "message": "Resource not found", "content": [] }), 200
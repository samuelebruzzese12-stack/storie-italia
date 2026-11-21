cmake_minimum_required(VERSION 3.22.1)
project(storie C CXX)

# llama.cpp viene scaricato dal workflow GitHub in questa cartella (versione fissata)
set(LLAMA_DIR ${CMAKE_CURRENT_SOURCE_DIR}/llama.cpp)

set(BUILD_SHARED_LIBS     OFF CACHE BOOL "" FORCE)
set(LLAMA_BUILD_TESTS     OFF CACHE BOOL "" FORCE)
set(LLAMA_BUILD_EXAMPLES  OFF CACHE BOOL "" FORCE)
set(LLAMA_BUILD_SERVER    OFF CACHE BOOL "" FORCE)
set(LLAMA_BUILD_COMMON    OFF CACHE BOOL "" FORCE)
set(LLAMA_CURL            OFF CACHE BOOL "" FORCE)
set(GGML_NATIVE           OFF CACHE BOOL "" FORCE)
set(GGML_OPENMP           OFF CACHE BOOL "" FORCE)
# istruzioni veloci per CPU ARM moderne (telefoni dal 2019 in poi)
set(GGML_CPU_ARM_ARCH "armv8.2-a+dotprod+fp16" CACHE STRING "" FORCE)

# l'AI deve essere veloce anche nelle build non-release
set(CMAKE_C_FLAGS   "${CMAKE_C_FLAGS} -O3")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O3")

add_subdirectory(${LLAMA_DIR} build-llama)

add_library(storie SHARED storie.cpp)
target_include_directories(storie PRIVATE ${LLAMA_DIR}/include ${LLAMA_DIR}/ggml/include)
target_link_libraries(storie llama ggml android log)
# allineamento a 16 KB richiesto da Google Play per i telefoni Android 15+
target_link_options(storie PRIVATE "-Wl,-z,max-page-size=16384" "-Wl,-z,common-page-size=16384")
